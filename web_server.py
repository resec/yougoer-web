# coding: utf-8
import tornado.ioloop
import tornado.web
import tornado.httpserver
import os.path
from tornado.options import define, options

import media
from urls import handlers_list


define("port", default=8888, help="run on the given port", type=int)


class Application(tornado.web.Application):

    def __init__(self):
        handlers = handlers_list

        template_path = os.path.join(os.path.dirname(__file__), "template")
        static_path = os.path.join(os.path.dirname(__file__), "static")
        media_path = os.path.join(static_path, 'media')
        media_service = media.MediaService(media_src=media_path)

        settings = dict(
            template_path=template_path,
            static_path=static_path,
            #xsrf_cookies=True,
            cookie_secret="yougoer-web",
            debug=True,
            media_service=media_service,
        )
        super(Application, self).__init__(handlers, **settings)


def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
