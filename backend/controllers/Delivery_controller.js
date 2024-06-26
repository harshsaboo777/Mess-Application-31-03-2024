import client from "../db.js";

export const fetch_current_mess = async (req, res) => {

    const {agent_id} = req.body;
    let exists;
    try {
      exists = await client.query("select * from request inner join mess on mess.mess_id=request.mess_id where agent_id=$1 and request.status='Hired';",
      [agent_id]);
    } catch (err) {
      console.log(err);
    }
    res.status(200).send(exists.rows);
  };

export const fetch_hire_requests = async (req, res) => {

    const {agent_id} = req.body;
    let exists;
    try {
      exists = await client.query("select * from request inner join mess on mess.mess_id=request.mess_id where agent_id=$1 and request.status='Pending';",
      [agent_id]);
    } catch (err) {
      console.log(err);
    }
    res.status(200).send(exists.rows);
  };

  export const accept_request = async (req, res) => {

    const {Mess_id,agent_id} = req.body;
    let exists;
    try {
      exists = await client.query("update request set status = 'Hired' where mess_id = $1 and agent_id=$2 ",
      [Mess_id,agent_id]);
    } catch (err) {
      console.log(err);
    }
    res.status(200).send(exists.rows);
  };

  export const delete_request = async (req, res) => {

    const {Mess_id,agent_id} = req.body;
    let exists;
    try {
      exists = await client.query("delete from request where mess_id=$1 and agent_id=$2;",
      [Mess_id,agent_id]);
    } catch (err) {
      console.log(err);
    }
    res.status(200).send(exists.rows);
  };
  
  export const fetch_mess_loc = async (req, res) => {
    const {Mess_id} = req.body;
    let exists;
    try {
      exists = await client.query("select log,lat from users inner join mess on Users.User_id = mess.mess_owner_id where Mess_id=$1",
      [Mess_id]);
    } catch (err) {
      console.log(err);
    }
    console.log(exists.rows);
    res.status(200).send(exists.rows);
  };

  export const fetch_mess_id = async (req, res) => {
    const {deliver_id} = req.body;

    let exists;
    try {
        // console.log("ckjsbsiucbsikjcbsjkcbsjbcjocbojsbcojbc"+ deliver_id);
        exists = await client.query("select mess_id from mess where agent=$1",[deliver_id]);
        // console.log("ckjsbsiucbsikjcbsjkcbsjbcjocbojsbcojbc"+ exists.rows[0]);
      } catch (err) {
        console.log(err);
      }

    res.send(exists.rows[0]);
  };

  export const fetch_mess_users = async (req, res) => {
    const {Mess_id} = req.body;
    // console.log("sjbiobdaikbiaubdiaudvbaikdvbadibaidoudvbaidvbdikyavdiyhdvdiyhov  "+Mess_id)
    let exists;
    try {
      exists = await client.query("select Users.fname,Users.lname,Users.phone_num,Users.email,Users.user_address,Subscription.daily_tokens,log,lat from subscription inner join Users on Users.User_id = Subscription.customer_id where subscription.Mess_id=$1",
      [Mess_id]);
    } catch (err) {
      console.log(err);
    }
    // console.log("xsijbcisj/bcvisuocgsiocusbcioj"+exists.rows);
    res.status(200).send(exists.rows);
  };