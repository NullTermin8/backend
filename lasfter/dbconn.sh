if [ $# -eq 0 ]
  then
    PGPASSWORD=535f0158ca9603c29a9fef136a3fc96184b00a42616ea8cace890f21a3dd1a4e \
    psql --dbname=deqqieh5qjv49b \
      --host=ec2-23-23-221-255.compute-1.amazonaws.com \
      --port=5432 \
      --username=hdscufobzezfzk
  else
    PGPASSWORD=535f0158ca9603c29a9fef136a3fc96184b00a42616ea8cace890f21a3dd1a4e \
    psql --dbname=deqqieh5qjv49b \
      --host=ec2-23-23-221-255.compute-1.amazonaws.com \
      --port=5432 \
      --username=hdscufobzezfzk \
      -f $1
  fi

