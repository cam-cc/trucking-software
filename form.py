from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, length
from database import Database

db = Database()

class invoiceForm(FlaskForm):
    company = SelectField('Company', choices=[], validators=[DataRequired(), length(min=2, max=50)])
    driver = SelectField('Driver', choices=[], validators=[DataRequired(), length(min=2, max=50)])
    trailer = SelectField('Trailer', choices=[], validators=[DataRequired(), length(min=2, max=10)])
    truck = SelectField('Truck', choices=[], validators=[DataRequired(), length(min=2, max=10)])
    submit = SubmitField('Submit')

