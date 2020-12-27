from flask import Flask, render_template, request
import os
import random
from flask import json, url_for,jsonify,request,make_response
from data_processing.prep_modelv2 import evaluateinput,getrandomnames,collabfiltering
from flask_cors import CORS
import pandas as pd

app= Flask(__name__)
CORS(app, supports_credentials=True)

movies_df = pd.read_csv(os.getenv('INPUTMOVIESFILE'))
random_movies_df = pd.read_csv(os.getenv('INPUTMOVIESFILE'))
ratings_df = pd.read_csv(os.getenv('INPUTRATINGSFILE'))
movies_df['year'] = movies_df.title.str.extract('(\(\d\d\d\d\))', expand=False)
movies_df['year'] = movies_df.year.str.extract('(\d\d\d\d)', expand=False)
# Removing the years from the 'title' column
movies_df['title'] = movies_df.title.str.replace('(\(\d\d\d\d\))', '')
# Applying the strip function to get rid of any ending whitespace characters that may have appeared
movies_df['title'] = movies_df['title'].apply(lambda x: x.strip())
# Dropping the genres column
movies_df = movies_df.drop('genres', 1)
# Drop removes a specified row or column from a dataframe
ratings_df = ratings_df.drop('timestamp', 1)

@app.route('/')
def index():
    return 'working'

@app.route('/getrandom')
def getrandommovies():
    try:
        args=request.args
        nummoviees=int(args['count'])
        ids=getrandomnames(nummoviees,random_movies_df)
        resp=make_response(jsonify(ids=ids))
    except Exception as e:
        resp = make_response(jsonify(error='an error occured in getting response'),500)
    return resp

@app.route('/getrecomcollab',methods=['POST'])
def getrecomcollab():
    usrinput=request.get_json()
    try:
        recomresp=collabfiltering(usrinput,movies_df,ratings_df)
        resp=make_response(jsonify(recomresp))
    except Exception as e:
        resp = make_response(jsonify(error='an error occured in getting response'),500)
    return resp


# #########---------------this is not used. This endpoint is using k-means algorithm----------------
@app.route('/getrecom',methods=['POST'])
def getrecoms():
    inputdata=request.get_json()
    usrid='x'+str(random.randint(1,9000))
    tmpinput=[]
    for v in inputdata:
        tmpdict={}
        tmpdict['userId']=usrid
        tmpdict['movieId']=v['movieId']
        tmpdict['rating']=v['rating']
        tmpdict['timestamp']=964982703
        tmpinput.append(tmpdict)
    out=evaluateinput(tmpinput)
    resp=make_response(jsonify(results=out))
    return resp

if __name__=='__main__':
    appPort=int(os.environ.get('PORT',5000))
    app.run(debug=True,host='0.0.0.0',port=appPort)