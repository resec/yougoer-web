# coding: utf-8
import tornado.ioloop
import tornado.web
import os.path
import media


from urls import handlers_list


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
    application = Application()
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
