from flask import Flask

app = Flask(__name__)
@app.route('/users')
def users(cur):
  cur.execute('SELECT * from users;')
  users= cur.fetchall()
  return {"users":[users]}
        

@app.route('/loc')
def loc(cur):
  cur.execute('SELECT * from locations;')
  loc= cur.fetchall()
  return {"hello":[loc]}