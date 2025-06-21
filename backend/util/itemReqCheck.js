    //mongoose by default dont have functionality to check whether the updated value ot model meet with craiteria or not so to overcome this 
    //this function will check all the nessesary criateria for the updated value of model we are making a object their is two key in object one is 
    //success that is bolean and another is a object that store the error messages

    const itemReqCheck=(body)=>{
        console.log(body);
        
        const data={
            success:false,
            message:{},
        };

        if(body.name && (body.selling_price >= 100) && body.discription){
            data.success= body.discount_percentage?body.discount_percentage<50?true:false:true;
        }
        else{
            
            for(let field in body){
                if(field==="selling_price"  || field==="discription" || field==="discount_percentage" || field==="name" ||
                    field === "img_url"){

                    if(field==="discount_percentage" && body[field]){
                        if(body[field]> body.actual_price*0.5 && body.actual_price){
                            data.message[field]=`Discouunt percentage can not me be more than 50%`;
                        }
                    }
                    else if(field==="selling_price" && body[field] && Number(body[field]<100)){
                        data.message[field]='price cant be less than 100';
                    }

                    else if (field === "img_url" && body[field]) {
                        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
                        if (!urlRegex.test(body[field])) {
                            data.message[field] = "Invalid image URL. Must be a valid URL ending with png, jpg, jpeg, gif, or webp.";
                        }
                    }
                        
                    else if(!(body[field])){
                        data.message[field]=`${field} can not be empty`;
                    }

                }
            }
            co

        }
        return data;
        
        
    }

    module.exports={itemReqCheck};