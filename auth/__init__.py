import hasher
import crypto

from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA

import base64

DEFAULT_TOKEN_LEN = 1024

TOKEN_POOL = {}


def new_token(bit_len=DEFAULT_TOKEN_LEN):    
    key = RSA.generate(bit_len)
    token = '%d$%d' % (key.n, key.e)
    TOKEN_POOL[token] = key
    return token


def has_token(token):
    return token in TOKEN_POOL


def decrypt(token, encrypted):
    key = TOKEN_POOL[token]
    cipher = PKCS1_OAEP.new(key)
    decoded = base64.b64decode(encrypted)
    decrypted = cipher.decrypt(decoded)
    del TOKEN_POOL[token]
    return decrypted


def hash(pw):
    return hasher.encode(pw)


def verify(pw, hashed2):
    return hasher.verify(pw, hashed2)