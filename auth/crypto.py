import hashlib
import hmac
import random

DEFAULT_DKLEN = 256
DEFAULT_DIGEST = hashlib.sha256

random = random.SystemRandom()


def random_string(length,
                allowed_chars='abcdefghijklmnopqrstuvwxyz'
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                              '0123456789'):
    return ''.join(random.choice(allowed_chars) for i in range(length))


def _force_bytes(s, encoding='ascii'):
    return s.encode(encoding)


def pbkdf2(password, salt, iterations, dklen=0, digest=None):
    def name():
        return 'pbkdf2_sha256'

    if digest is None:
        digest = DEFAULT_DIGEST
    if not dklen:
        dklen = DEFAULT_DKLEN
    password = _force_bytes(password)
    salt = _force_bytes(salt)
    return hashlib.pbkdf2_hmac(
        digest().name, password, salt, iterations, dklen)

def compare(d1, d2):
    return hmac.compare_digest(_force_bytes(d1), _force_bytes(d2))


