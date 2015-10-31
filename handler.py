import tornado.web
import tornado.gen

import concurrent.futures


EXECUTOR = concurrent.futures.ThreadPoolExecutor(5)


class AuthLoginHandler(tornado.web.RequestHandler):

    @tornado.gen.coroutine
    def get(self):
        token = yield EXECUTOR.submit(auth.new_token)
        self.set_header('token', token)
        self.render("login.html", error=None, token=token)

    @tornado.gen.coroutine
    def post(self):
        user = self.get_argument('user', 'Empty')
        print("user: " + user)
        self.write("user: " + user + '<br>')

        password = self.get_argument('password', 'Empty')
        print("password: " + password)
        self.write("password: " + password + '<br>')

        token = self.get_argument('token', 'Empty')
        print("token: " + token)
        self.write("token: " + token + '<br>')

        decrypted = auth.decrypt(token, password).decode('ascii')
        print("decrypted: " + decrypted)
        self.write("decrypted: " + decrypted + '<br>')
