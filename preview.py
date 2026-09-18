"""Serve dist locally, with optional access from the specified Wi-Fi subnet."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from ipaddress import ip_interface, ip_address
from pathlib import Path
from threading import Thread


class PreviewServer(ThreadingHTTPServer):
    # Avoid dropped connections when several image layers load together.
    request_queue_size = 128
    daemon_threads = True

    def verify_request(self, request, client_address):
        address = ip_address(client_address[0])
        return address.is_loopback or (
            self.allowed_network is not None and address in self.allowed_network
        )


class PreviewHandler(SimpleHTTPRequestHandler):
    def list_directory(self, path):
        self.send_error(403)
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--lan', help='Wi-Fi interface and prefix, e.g. 192.168.1.7/24')
    args = parser.parse_args()
    interface = ip_interface(args.lan) if args.lan else None
    if interface and (interface.version != 4 or not interface.ip.is_private
                      or interface.ip.is_unspecified or interface.ip.is_loopback):
        parser.error('--lan requires a private Wi-Fi IPv4 address')
    handler = partial(PreviewHandler, directory=str(Path(__file__).parent / 'dist'))
    servers = []
    try:
        for host in ['127.0.0.1'] + ([str(interface.ip)] if interface else []):
            server = PreviewServer((host, 4173), handler)
            server.allowed_network = interface.network if interface else None
            servers.append(server)
        for server in servers[1:]:
            Thread(target=server.serve_forever, daemon=True).start()
        for server in servers:
            print(f'Preview: http://{server.server_address[0]}:4173/', flush=True)
        servers[0].serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        for server in servers:
            server.server_close()


if __name__ == '__main__':
    main()
