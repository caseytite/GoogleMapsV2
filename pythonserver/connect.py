from configparser import ConfigParser
import psycopg2
from flask import Flask
from config import config

app = Flask(__name__)

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        cur = conn.cursor()

        
        @app.route('/users')
        def users():
            cur.execute('SELECT * from users;')
            users = cur.fetchall()
            return {"users":[users]}
        
        @app.route('/loc')
        def loc():
            cur.execute('SELECT * from locations;')
            loc = cur.fetchall()
            return {"locations":[loc]}

        if __name__ == "__main__":
            app.run(debug=True)

       
	# close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

if __name__ == '__main__':
    connect()