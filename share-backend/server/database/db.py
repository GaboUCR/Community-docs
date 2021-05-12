import sqlite3
from flask import g
from os import path

def createDatabase():
    conn = sqlite3.connect("server/database/share.sqlite3")
    cur = conn.cursor()

    cur.executescript("""

    create table cookie(
        cookie_hash TEXT,
        user_id TEXT,
        date TEXT,
        id INTEGER PRIMARY KEY
    );

    create table user(
        username TEXT,
        email TEXT,
        password TEXT,
        cookie TEXT,
        id INTEGER PRIMARY KEY
    );

    create table post(
        title TEXT,
        body TEXT,
        community_id INTEGER,
        user_id INTEGER,
        id INTEGER PRIMARY KEY
    );

    create table community(
        name TEXT,
        user_id INTEGER,
        id INTEGER PRIMARY KEY

    );
    """)

    conn.commit()
    cur.close()
    conn.close()


def print_database():

    conn = sqlite3.connect("server/database/share.sqlite3")
    cur = conn.cursor()

    t = cur.execute("select * from user").fetchall()
    cur.close()
    conn.close()
    return t

def get_db():

    if "db" not in g:
        if (not path.exists("server/database/share.sqlite3")):
            createDatabase()

        g.db = sqlite3.connect("server/database/share.sqlite3")

    return g.db


def close_db():

    db = g.pop("db", None)

    if db is not None:
        db.close()
