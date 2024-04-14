import client from "../db.js";

export const View_mess = async (req, res) => {

    let exists;
    try {
      exists = await client.query("select * from Mess ");
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send(exists.rows);
  };

  export const View_subscribed_mess = async (req, res) => {

    const {customer_id} = req.body;
    let exists;
    console.log(customer_id);
    try {
      exists = await client.query("select mess.tiffin_details,mess.status,mess.mess_name,Subscription.mess_id,Subscription.daily_tokens,Subscription.remaining_token,Subscription.subscription_validity from Subscription inner join mess on subscription.mess_id=mess.mess_id where customer_id=$1 ",
      [customer_id]);
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send(exists.rows);
  };



  export const Subscribe_mess = async (req, res) => {
    const { customer_id, Mess_id, Remaining_token,subscription_validity} = req.body;

    let exists;
    try {
      exists = await client.query("Select * from Subscription where customer_id = $1 and Mess_id = $2",
      [
        customer_id,Mess_id
      ]);
    } catch (err) {
      console.log(err);
    }
    
    if(exists.rowCount!==0)
    {
      res.send("Cannot Subscribe same mess multiple times.");
    }else
    {
        try {
      exists = await client.query("INSERT INTO Subscription(customer_id,Mess_id,Remaining_token,subscription_validity,Daily_tokens,Subscription_date) VALUES($1,$2,$3,$4,1,CURRENT_DATE);", [
      customer_id, Mess_id, Remaining_token,subscription_validity
      ]);
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send("Successfully Subscribed!");
    }
  };
  
  // use to alert user that subscription is about to end 
  export const Remaining_Daily_tokens = async (req,res) => {
    const {customer_id,Mess_id} = req.body;

    let exists;

    try {
      exists = await client.query("Select remaining_tokens from Subscription where Mess_id=$1 and customer_id = $2",
      [
        Mess_id,customer_id        
      ])
    }catch(err) {
      console.log(err);
    }

    // console.log(exists);
    res.status(200).send(exists.rows[0]);
  }

  // when user changes number of tiffins per day
  export const Change_daily_tokens = async (req, res) => {
    const { customer_id,Mess_id,Daily_tokens} = req.body;
    let exists;
    try
    {
      exists = await client.query("Select * from Subscription where customer_id=$1 and Mess_id=$2",
      [
        customer_id,Mess_id
      ])
      // console.log(exists.rows[0].remaining_token);
      if(exists.rows[0].remaining_token < Daily_tokens)
      {
        
        res.status(400).send("Inadequate amount of Tokens left")
      }
      else
      {
        exists = await client.query("UPDATE Subscription SET Daily_tokens=$3 where customer_id=$1 and Mess_id=$2",
        [
          customer_id,Mess_id,Daily_tokens
        ]);
        res.status(200).send("Successfully Updated Daily Tokens!");
      }

    }catch(err)
    {
      console.log(err);
    }
  };

  export const Rate_Mess = async(req,res) => {

    const {User_id,Mess_id,Rating} = req.body;
    
    console.log(User_id,Mess_id,Rating);
    let exists;
    try {
      exists = await client.query("Select * from Ratings where User_id = $1 and Mess_id = $2",
      [
        User_id,Mess_id
      ]);
    } catch (err) {
      console.log(err);
    }
    if(exists.rowCount!==0)
    {
      try {
            exists = await client.query("UPDATE ratings SET rating = $3 WHERE user_id=$1 and mess_id =$2;",
            [
                User_id,Mess_id,Rating 
            ]);
          } catch (err) {
            console.log(err);
          }
      res.send("Updated Rating successfully!");
    }else
    {
        try {
            exists = await client.query("Insert into Ratings(User_id,Mess_id,Rating) Values($1,$2,$3)",
            [
                User_id,Mess_id,Rating 
            ]);
          } catch (err) {
            console.log(err);
          }
        res.status(200).send("Successfully Rated");
    }
    
  }

  export const View_mess_rating = async(req,res) => {
    const {Mess_id} = req.body;
    let exists;
    try {
      exists = await client.query("Select count(user_id) as count,avg(rating) as average from Ratings group by mess_id having mess_id =  $1;",[Mess_id]);
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows[0]);
    res.status(200).send(exists.rows[0]);
  }

  export const Update_profile = async (req, res) => {

    const {User_id,Fname, Lname, Phone_num, Password, User_address} = req.body;

    let exists;
    try {
      exists = await client.query("UPDATE Users SET Fname=$1, Lname=$2, Phone_num=$3, Password=$4, User_address=$5 where User_id=$6",
      [
        Fname, Lname, Phone_num, Password, User_address,User_id
      ]);
    } catch (err) {
      console.log(err);
    }
    // console.log(exists.rows);
    res.status(200).send("Successfully Updated Profile!");
  };

  export const fetch_profile = async (req, res) => {

    const {User_id} = req.body;

    let exists;
    try {
      exists = await client.query("Select * from Users where User_id = $1",
      [
        User_id
      ]);
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send(exists.rows[0]);
  };

  export const filter_mess = async(req,res) => {
    
    const {Filter_rating} = req.body;
    let exists;

    try{
    exists = await client.query("select * from Mess where Mess_id in (Select Mess_id from Ratings group by Mess_id having avg(Rating)>=$1)",[Filter_rating]);
    }catch(err){

      console.log(err);
    }
    res.status(200).send(exists.rows);
  }

  export const Make_payment = async(req,res) => {
    
  }

  // daily tokens remaining tokens validity in subscription 
  // seperate rating table user id mess id rating 
   

  // daily tokens remaining tokens validity in subscription 
  // seperate rating table user id mess id rating 
   
  export const fetchNearbyMess = async(req,res) => {
    
    const {user_id} = req.body;
    let exists;
    let lat1,log1;
    
    try{
    exists = await client.query("select lat as lat1, log as log1 from users where user_id = $1    ",[user_id]);
    lat1 = exists.rows[0].lat1;
    log1 = exists.rows[0].log1;
    }catch(err){

      console.log(err);
    }

    try{
    exists = await client.query("SELECT * FROM mess INNER JOIN users ON mess.mess_owner_id = users.user_id WHERE (($1 - CAST(users.lat AS FLOAT)) * ($1 - CAST(users.lat AS FLOAT)) + ($2 - CAST(users.log AS FLOAT)) * ($2 - CAST(users.log AS FLOAT)))  < 0.027*0.027 ;",[lat1,log1]);
    }catch(err){
      console.log(err);
    }
    
    res.status(200).send(exists.rows);
  }

  
  export const fetch_new = async (req, res) => {

    const {customer_id} = req.body;
    let exists;
    console.log(customer_id);
    try {
      exists = await client.query("select mess.mess_name, Subscription.remaining_token from Subscription inner join mess on subscription.mess_id=mess.mess_id where customer_id=$1 AND Subscription.remaining_token < 10 ",
      [customer_id]);
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send(exists.rows);
  };

  export const update_address = async (req, res) => {

    const {User_id,lat,lng,user_address} = req.body;

    let exists;
    try {
      exists = await client.query("UPDATE Users SET lat=$2, log=$3, user_address=$4 where user_id=$1",
      [
        User_id,lat,lng,user_address
      ]);
    } catch (err) {
      console.log(err);
    }
     console.log(exists.rows);
    res.status(200).send("Successfully Address Cordinates Updated");
  };