from database import Database
from flask import Flask, jsonify, request, render_template, flash, redirect
from credentials import credential
from flask_mysqldb import MySQL
from mapsAPI.distance import Distance


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['MYSQL_HOST'] = credential['host']
app.config['MYSQL_USER'] = credential['user']
app.config['MYSQL_PASSWORD'] = credential['password']
app.config['MYSQL_DB'] = credential['database']

mysql = MySQL(app)
db = Database(mysql)
calc = Distance()

@app.route('/updatefsc', methods=['POST'])
def updatefsc():
    content = request.json
    db.updateCompanyFSC(content['companyID'], content['updatedFSC'])
    return jsonify(content)


@app.route('/updaterate', methods=['POST'])
def updaterate():
    content = request.json
    db.updateCompanyRate(content['companyID'], content['updatedRate'])
    return jsonify(content)

@app.route('/updatefsc/<cID>', methods=['GET', 'POST'])
def updatefscroute(cID):
    if request.method == 'POST':
        print(request.json['updateValue'])
    company = db.getCompanyByID(cID)
    return render_template('updatefsc.html', company=company)


@app.route('/view/<cID>', methods=['GET', 'POST'])
def view(cID):
    trucks = db.getTruckInfo()
    driver = db.getDriverInfo()
    load = db.getTrailerInfo()
    selectCompany = db.getCompanyByID(cID)
    comp = db.getCompanyInfo()
    id = cID
    return render_template('invoice.html', company=selectCompany, truck=trucks, operator=driver, trailer=load, companies=comp, ID=id)

@app.route('/calculate/<pointA>/<pointB>', methods=['GET'])
def calculate(pointA , pointB):
    a = db.getCompanyByID(pointA)
    b = db.getCompanyByID(pointB)

    total = calc.calcDistance(a['latitude'], a['longitude'], b['latitude'], b['longitude'])
    return jsonify(total)

# backend api
@app.route('/company/<cID>')
def company(cID):
    return jsonify(db.getCompanyByID(cID))

@app.route('/driver/<empID>')
def driverSearch(empID):
    return jsonify(db.getDriverByID(empID))

@app.route('/trailer/<trailID>')
def trailerSearch(trailID):
    return jsonify(db.getTrailerByID(trailID))

@app.route('/truck/<truckID>')
def truckSearch(truckID):
    return jsonify(db.getTruckByID(truckID))

@app.route('/trucks', methods=['GET'])
def truckInfo():
    return jsonify(db.getTruckInfo())

@app.route('/drivers', methods=['GET'])
def driverInfo():
    return jsonify(db.getDriverInfo())

@app.route('/trailers', methods=['GET'])
def trailerInfo():
    return jsonify(db.getTrailerInfo())

@app.route('/companies', methods=['GET'])
def companyInfo():
    return jsonify(db.getCompanyInfo())

if __name__ == '__main__':
    app.run()
