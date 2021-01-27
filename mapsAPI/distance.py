import urllib.request
import json

class Distance:
    def __init__(self):
        self.kfile = open('key.txt','r')
        self.key = self.kfile.read().strip()
    def calcDistance(self,aLat,aLong,bLat,bLong):
        origin = str(aLat) + ',' + str(aLong)
        destination = str(bLat) + '%2C' + str(bLong)

        url = ('https://maps.googleapis.com/maps/api/distancematrix/json'
                + '?&units=imperial'
                + '&origins={}'
                + '&destinations={}'
                + '&key={}'
                ).format(origin,destination,self.key)

        response = urllib.request.urlopen(url)
        # print (json.loads(response.read()))
        response_json = json.loads(response.read())
        distance_miles = response_json['rows'][0]['elements'][0]['distance']['text']
        return distance_miles
