from credentials import credential
import json

class Database:
    def __init__(self, mysql):

        self.mysql = mysql

    def getTruckInfo(self):
        cursor = self.mysql.connection.cursor()
        trucks = []
        query = 'select Truck_id, Vin, Plate, Year, Make, Model, Weight from TRUCK_INFO;'
        cursor.execute(query)
        for (truckID, vin, plate, year, make, model, weight) in cursor.fetchall():
            truck = {'truckID' : truckID, 'vin' : vin, 'plate' : plate, 'year' : year,  'make' : make, 'model' : model, 'weight' : weight}
            trucks.append(truck)
        cursor.close()
        return trucks

    def getCompanyInfo(self):
        '''
        Returns json -> companies info
        e.g -> {'company': 'Accuride Wheels', 'address': '4800 Gateway Blvd', 'city': 'Springfield', 'stateProvince': 'Ohio'}
        '''
        cursor = self.mysql.connection.cursor()
        companies = []
        query = ('select ID, Company, Address, City, StateProvince from COMPANY_INFO')
        cursor.execute(query)
        for (companyID, company, address, city, stateProvince) in cursor.fetchall():
            c = {'companyID' : companyID, 'company' : company, 'address' : address, 'city' : city, 'stateProvince' : stateProvince}
            companies.append(c)
        cursor.close()
        return companies

    def getTrailerInfo(self):
        '''
        Returns json -> Trailer info
        '''
        cursor = self.mysql.connection.cursor()
        trailers = []
        query = ('select Trailer_id, Plate, Weight, StateProvince, Hazmat from TRAILER_INFO')
        cursor.execute(query)
        for (trailer, plate, weight, stateProvince, hazmat) in cursor.fetchall():
            t = {'trailer' : trailer, 'plate' : plate, 'weight' : weight, 'stateProvince' : stateProvince, 'hazmat' : hazmat}
            trailers.append(t)
        cursor.close()
        return trailers

    def getDriverInfo(self):
        '''
        Returns json -> Driver info
        '''
        cursor = self.mysql.connection.cursor()
        drivers = []
        query = ('select id, firstName, lastName, Phone, Truck_id, Fast_card, Owner_op from DRIVER_INFO')
        cursor.execute(query)
        for (driverID, firstName, lastName, phone, truckID, fastCard, ownOp) in cursor.fetchall():
            drive = {'driverID' : driverID, 'firstName' : firstName, 'lastName' : lastName, 'phone' : phone, 'truckID' : truckID, 'fastCard' : fastCard, 'ownOp' : ownOp}
            drivers.append(drive)
        cursor.close()
        return drivers

    def getCompanyByID(self,companyID):
        '''
        Returns json -> Company info
        '''
        cursor = self.mysql.connection.cursor()
        selectedCompany = []
        query = (f'select ID, Company, Address, City, StateProvince, latitude, longitude, fsc, rate from COMPANY_INFO where ID = {companyID}')
        cursor.execute(query)
        for (cID, company, address, city, stateProvince, latitude, longitude, fsc, rate) in cursor.fetchall():
            c = {'ID': cID, 'company' : company, 'address' : address, 'city' : city, 'stateProvince' : stateProvince, 'latitude' : latitude, 'longitude' : longitude, 'fsc' : fsc, 'rate' : rate}
            selectedCompany.append(c)

        cursor.close()
        return selectedCompany[0]

    def getDriverByID(self,empID):
        '''
        Returns json -> Company info
        '''
        cursor = self.mysql.connection.cursor()
        drivers = []
        query = (f'select id, firstName, lastName, Phone, Truck_id, Fast_card, Owner_op from DRIVER_INFO where id = {empID}')
        cursor.execute(query)
        for (driverID, firstName, lastName, phone, truckID, fastCard, ownOp) in cursor.fetchall():
            drive = {'driverID' : driverID, 'firstName' : firstName, 'lastName' : lastName, 'phone' : phone, 'truckID' : truckID, 'fastCard' : fastCard, 'ownOp' : ownOp}
            drivers.append(drive)
        cursor.close()
        return drivers[0]


    def getTrailerByID(self,trailID):
        '''
        Returns json -> Company info
        '''
        cursor = self.mysql.connection.cursor()
        trailers = []
        query = (f'select Trailer_id, Plate, Weight, StateProvince, Hazmat from TRAILER_INFO where Trailer_id = {trailID}')
        cursor.execute(query)
        for (trailer, plate, weight, stateProvince, hazmat) in cursor.fetchall():
            t = {'trailer' : trailer, 'plate' : plate, 'weight' : weight, 'stateProvince' : stateProvince, 'hazmat' : hazmat}
            trailers.append(t)
        cursor.close()
        return trailers[0]

    def getTruckByID(self,truckID):
        '''
        Returns json -> Company info
        '''
        cursor = self.mysql.connection.cursor()
        trucks = []
        query = (f'select Truck_id, Vin, Plate, Year, Make, Model, Weight from TRUCK_INFO where Truck_id = {truckID}')
        cursor.execute(query)
        for (truckID, vin, plate, year, make, model, weight) in cursor.fetchall():
            truck = {'truckID' : truckID, 'vin' : vin, 'plate' : plate, 'year' : year,  'make' : make, 'model' : model, 'weight' : weight}
            trucks.append(truck)
        cursor.close()
        return trucks[0]

    def updateCompanyFSC(self, companyID, newFSC):
        cursor = self.mysql.connection.cursor()
        query = (f'update COMPANY_INFO set fsc = {newFSC} where ID = {companyID}')
        cursor.execute(query)
        self.mysql.connection.commit()
        cursor.close()


    def updateCompanyRate(self, companyID, newRate):
        cursor = self.mysql.connection.cursor()
        query = (f'update COMPANY_INFO set rate = {newRate} where ID = {companyID}')
        cursor.execute(query)
        self.mysql.connection.commit()
        cursor.close()
