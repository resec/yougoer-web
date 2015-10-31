import crypto

import base64

DEFAULT_ITERATIONS = 100000
DEFAULT_SALT_LENGTH = 12
ENCODE_ALGORITHM_NAME = "pbkdf2_sha256"

def _random_salt(length=DEFAULT_SALT_LENGTH):
    return crypto.random_string(length)


def encode(password, salt=None, iterations=DEFAULT_ITERATIONS):
    assert password is not None
    assert iterations >= DEFAULT_ITERATIONS

    if not salt: salt = _random_salt()

    hash = crypto.pbkdf2(password, salt, iterations)
    hash = base64.b64encode(hash).decode('ascii').strip()
    return "%s$%d$%s$%s" % (ENCODE_ALGORITHM_NAME, iterations, salt, hash)


def verify(password, encoded):
    algorithm, iterations, salt, hash = encoded.split('$', 3)
    
    encoded2 = encode(password, salt, int(iterations))
    return crypto.compare(encoded, encoded2)


def summary(encoded):
    algorithm, iterations, salt, hash = encoded.split('$', 3)
    
    return {
        'algorithm': algorithm,
        'iterations': iterations,
        'salt': salt,
        'hash': hash,
    }