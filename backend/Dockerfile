FROM ubuntu:20.04
RUN apt-get update -y && apt-get install software-properties-common -y  && apt-get upgrade -y && apt install python3-pip -y && apt-get install git -y && apt-get install curl -y
RUN mkdir /home/recombackendapp && mkdir /home/recombackendapp/data_files
RUN pip3 install Flask
ENV FLASK_APP main
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
EXPOSE 5000
WORKDIR /home/recombackendapp
COPY . /home/recombackendapp
RUN pip3 install -r requirements.txt
CMD ["gunicorn", "--config", "gunicorn_config.py", "wsgi:app"]