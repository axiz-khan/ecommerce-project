const Item=require("../models/itemModels");

//This function check the item id that comes it http request actually exist or not if item dont exist that it return false
//If item exist it retutn true

const isItemExist=async (id)=>{   
    // find the item by id if id is wrong than findById return null else it return true
    
    const item=await Item.findById(id);
    
    

    if(item){
        //if item exist we return (true and data of item)
        

        return ({success:true,itemdata:item});
    }else{
        //if item dont exist we return (false)
    
        return false;
    }

}

module.exports={isItemExist};