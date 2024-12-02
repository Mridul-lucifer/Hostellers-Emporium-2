const {readDatabase , writeDatabase} = require('./ModulesToImport.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const LoginFile = './Functions/Database/LoginDetails.json';
const ProductFile = './Functions/Database/ProductDetails.json'
const QueryFile = './Functions/Database/Query.json'
const ChatFile = './Functions/Database/Chat.json'

const secret_key = "qwertyuiopkjhgf987654g[;,mhgdxcvbnl;jhtrdcvbnkl;lkjhg"

const SignUp = function (req,res){
    const login_database = readDatabase(LoginFile);
    const product_database = readDatabase(ProductFile);
    let id ;
    if(login_database.length==0){
        id = 1 ;
    }else{
        id = login_database[login_database.length-1].UserId + 1 ;
        for(let i = 0  ; i < login_database.length ; i++){
            if(login_database[i].Email==req.body.Email){
                return res.status(400).json({
                    msg : "Email already Registered"
                })
            }
        }
    }
    const Crypted_Password = bcrypt.hashSync(req.body.Password,8);
    const newSignUp = {
        UserId : id,
        Email : req.body.Email,
        Name : req.body.Name,
        Password : Crypted_Password,
        Contact : req.body.Contact,
        InProgressBuying :[],
        Bought : []
    }
    login_database.push(newSignUp);
    writeDatabase(LoginFile,login_database);

    const products = {
        UserId : id,
        Products : []
    }
    product_database.push(products);
    writeDatabase(ProductFile,product_database);
    const token = jwt.sign({UserId:id},secret_key)
    return res.status(202).json({
        msg : "Login Successfull",
        token : token
    })
}

const Login = function(req,res){
    const login_database = readDatabase(LoginFile);
    for(let i = 0 ; i < login_database.length ; i++ ){
        if(login_database[i].Email == req.body.Email ){
            if(bcrypt.compareSync(req.body.Password,login_database[i].Password)){
                const token = jwt.sign({UserId:login_database[i].UserId},secret_key,{ expiresIn: '1h' })
                return res.status(202).json({
                    msg : "Login Successfull",
                    token : token
                })
            }else{
                res.status(400).json({
                    msg : "Incorrect Password..."
                })
            }
        }
    }
    res.status(401).json({
        msg : "Recheck Your Email ID "
    })
}

const UpdateProfile = function(req,res){
    const login_database = readDatabase(LoginFile);
    for(let i = 0; i< login_database.length;i++){
        if(req.user.UserId==login_database[i].UserId){
            login_database[i].Name = req.body.Name;
            login_database[i].Contact = req.body.Contact;
            login_database[i].Email = req.body.Email;
            writeDatabase(LoginFile,login_database);
            res.status(202).json({
                msg : "Updated Data "
            });
        }
    }
    res.status(401).json({
        msg : "Email Lost",
    })
}

const ChangePassword = function(req,res){
    const login_database = readDatabase(LoginFile);
    for(let i = 0; i< login_database.length;i++){
        if(req.user.UserId==login_database[i].UserId){
            if(bcrypt.compareSync(req.body.oldPassword,login_database[i].Password)){
                login_database[i].Password = bcrypt.hashSync(req.body.newPassword,8);
                writeDatabase(LoginFile,login_database);
                return res.status(200).json({
                    msg : "Updated Successfuly"
                })
            }else{
                return res.status(402).json({
                    msg : "Old Password is Incorrect"
                })
            }
        }
    }
    res.status(401).json({
        msg : "Email Lost",
    })
}

const AccountDelete = function(req,res){
    const login_database = readDatabase(LoginFile);
    const product_database = readDatabase(ProductFile);
    for(let i = 0 ; i < login_database.length ; i++ ){
        if(login_database[i].Email == req.body.Email ){
            if(bcrypt.compareSync(req.body.Password,login_database[i].Password)){
                login_database.splice(i,1); 
                writeDatabase(LoginFile,login_database);
                product_database.splice(i,1);
                writeDatabase(ProductFile,product_database);
                return res.status(200).json({
                    msg : "Account Deleted"
                })
            }else{ 
                return res.status(400).json({
                    msg : "Incorrect Password..."
                })
            }
        }
    }
    return res.status(401).status({
        msg : "Recheck Your Email ID "
    })
}

const AddProduct = function(req,res){
    const product_database = readDatabase(ProductFile);
    for(let i = 0 ; i < product_database.length ; i++ ){
        if(req.user.UserId==product_database[i].UserId){
            let productId ;
            if(product_database[i].Products == 0){
                productId = 1;
            }else{
                productId = product_database[i].Products[product_database[i].Products.length-1].productId +1 ;
            }
            const timeInIST = new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
            const newProduct = {
                productId : productId,
                uniqueId : req.user.UserId +"."+productId,
                ProductName : req.body.ProductName,
                Quantity : req.body.Quantity,
                ImagePath : req.body.Image,
                rating : 0,
                review : [],
                sold :0,
                Price : req.body.Price,
                NightCharge : req.body.NightCharge,
                Extra : req.body.Extra,
                SoldUnits : [],
                InProgress : [],
                DateTime : timeInIST
            }
            product_database[i].Products.push(newProduct);
            writeDatabase(ProductFile,product_database);
            res.status(200).json({
                msg : "Product Added Successfull"
            });
        }
    }
}

const UpdateProduct = function(req,res){
    const product_database = readDatabase(ProductFile);
    for(let i = 0 ; i < product_database.length ; i++ ){
        if(req.user.UserId==product_database[i].UserId){
            for(let j = 0 ; j < product_database[i].Products.length;j++){
                if(req.body.ProductName == product_database[i].Products[j].ProductName){
                    product_database[i].Products[j].Quantity = req.body.Quantity
                    product_database[i].Products[j].Price = req.body.Price
                    product_database[i].Products[j].NightCharge = req.body.NightCharge
                    product_database[i].Products[j].Extra = req.body.Extra
                    writeDatabase(ProductFile,product_database);
                    res.status(200).json({
                        msg : "Prodct Update SuccessFull"
                    })
                }
            }
        }
    }
    res.status(400).json({
        msg : "Some Error Try to Input valid values" 
    })
}

const DeleteProduct = function(req,res){
    const product_database = readDatabase(ProductFile);
    for(let i = 0 ; i < product_database.length ; i++ ){
        if(req.user.UserId==product_database[i].UserId){
            for(let j = 0 ; j < product_database[i].Products.length;j++){
                if(req.body.ProductName == product_database[i].Products[j].ProductName){
                    product_database[i].Products.splice(j,1);
                    writeDatabase(ProductFile,product_database);
                    res.status(201).json({
                        msg : "Deletion of Product Successful"
                    })
                }
            }
        }
    }
    res.status(400).json({
        msg : "Some Error Try to Input valid values" 
    })
}

const AllProducts = function(req,res){
    const product_database = readDatabase(ProductFile);
    let arr = []
    for(let i = 0 ; i < product_database.length;i++){
        for(let j = 0 ; j < product_database[i].Products.length;j++){
            if(product_database[i].Products[j].Quantity>0 && (product_database[i].UserId !=req.user.UserId)){
                arr.push(product_database[i].Products[j]);
            }
        }
    }
    return res.status(200).json(arr);
}

const YourProducts = function(req,res){
    const product_database = readDatabase(ProductFile);
    for(let i = 0 ; i < product_database.length;i++){
        if((product_database[i].UserId == req.user.UserId)){
            return res.status(200).json(product_database[i].Products); 
        }
    }
}

const ProductBuying = function(req,res){
    const login_database = readDatabase(LoginFile);
    const product_database = readDatabase(ProductFile);
    const chatDatabase = readDatabase(ChatFile)

    for(let i = 0 ; i < product_database.length;i++){
        for(let j = 0 ; j < product_database[i].Products.length;j++){
            if(product_database[i].Products[j].uniqueId===req.body.uniqueId){
                product_database[i].Products[j].Quantity -= 1;
                let name = "unknown";
                let user_Index = -1;
                for(let k = 0 ; k < login_database.length ;k++){
                    if(login_database[k].UserId==req.user.UserId){
                        name = login_database[k].Email;
                        user_Index = k;
                        break;
                    }
                }

                // Creating a room for chat and also Storing room no. in both accounts 
                let id = -1;
                if(chatDatabase.length==0){
                    id = 1
                }else{
                    id = chatDatabase[chatDatabase.length-1].ChatId+1;
                }
                const ChatGroup = {
                    ChatId : id,
                    Chats : []
                }
                chatDatabase.push(ChatGroup);

                const time_curr = new Date();
                console.log(time_curr)
                product_database[i].Products[j].InProgress.push({
                    Units : 1,
                    buyer : name,
                    time : time_curr,
                    ChatId : id
                })
                login_database[user_Index].InProgressBuying.push({
                    ProductName : product_database[i].Products[j].ProductName,
                    Units :1 ,
                    Seller : login_database[i].Email,
                    time : time_curr,
                    ChatId : id
                })
                writeDatabase(LoginFile,login_database)
                writeDatabase(ProductFile,product_database);
                writeDatabase(ChatFile,chatDatabase)

                const contact = login_database[i].Email;
                res.status(200).json({
                    msg : "Contact : "+contact+" For futher query."
                })
            }
        }
    }
    res.status(400).json({
        msg : "Error in back "
    }) 
}

const Approving = function(req,res){
    const login_database = readDatabase(LoginFile);
    const product_database = readDatabase(ProductFile);
    const chatDatabase = readDatabase(ChatFile);
    let index = -1;
    for(let i = 0 ; i < product_database.length ;i++){
        if(req.user.UserId==product_database[i].UserId){
            index = i;
            break;
        }
    }
    if(index==-1){
        res.status(201).json({
            msg:"not a valid user"
        })
    }
    let product_index = -1;
    for(let i = 0 ; i < product_database[index].Products.length ;i++){
        if(product_database[index].Products[i].uniqueId==req.params.id){
            product_index = i ;
            break;
        }
    }
    if(product_index==-1){
        res.status(201).json({
            msg:"not a valid product"
        })
    }
    for(let i = 0 ; i < product_database[index].Products[product_index].InProgress.length;i++){
        if(product_database[index].Products[product_index].InProgress[i].time==req.params.time){
            const req_email = product_database[index].Products[product_index].InProgress[i].buyer
            product_database[index].Products[product_index].SoldUnits.push(product_database[index].Products[product_index].InProgress[i]);
            product_database[index].Products[product_index].InProgress.splice(i,1);
            writeDatabase(ProductFile,product_database);
            for(let i = 0 ;i < login_database.length;i++){
                if(login_database[i].Email==req_email){
                    for(let j = 0 ; j < login_database[i].InProgressBuying.length;j++){
                        if(login_database[i].InProgressBuying[j].time == req.params.time){
                            login_database[i].Bought.push(login_database[i].InProgressBuying[j]);
                            login_database[i].InProgressBuying.splice(j,1);
                            writeDatabase(LoginFile,login_database);
                            for(let i = 0 ; i < chatDatabase.length ;i++ ){
                                if(chatDatabase[i].ChatId==req.params.chatid){
                                    chatDatabase.splice(i,1);
                                    break;
                                }
                            }
                            writeDatabase(ChatFile,chatDatabase)
                            res.status(200).json({
                                msg:"Added to sold "
                            })
                        }
                    }
                }   
            }
            res.status(200).json({
                msg:"Added to sold "
            })
        }
    }
    res.status(201).json({
        msg:"not a valid entry"
    })
}

const GetQuery = function(req,res){
    const database = readDatabase(QueryFile);
    for(let i = 0 ; i < database.length ; i++){
        if(database[i].Question==req.body.Question){
            database[i].AskedFreq += 1;
            writeDatabase(QueryFile,database);
            return res.status(200).json({
                answer : database[i].Answer
            })
        }
    }
}

const GetSamples = function(req,res){
    const database = readDatabase(QueryFile);
    let arr = []
    for(let i = 0 ; i < database.length ;i++){
        if((database[i].Question.toLowerCase()).includes(req.params.que.toLowerCase())){
            arr.push(database[i]);
        }
    }
    arr.sort((a, b) => b.AskedFreq - a.AskedFreq);
    return res.status(200).json({
        examples : arr.splice(0,5)
    })
}

const YourBoughtProducts = function(req,res){
    login_database = readDatabase(LoginFile);
    for(let i = 0 ; i < login_database.length;i++){
        if(login_database[i].UserId==req.user.UserId){
            return res.status(200).json({
                InProgressBuying:login_database[i].InProgressBuying,
                Bought:login_database[i].Bought
            })
        }
    }
    return res.status(200).json({
        msg : "Error person not found"
    })
}

const reviewSystem = function(req,res){
    const login_database = readDatabase(LoginFile);
    const product_database = readDatabase(ProductFile);
    let user_index = -1;
    for(let i = 0 ; i < login_database.length ;i++){
        if(req.body.Email==login_database[i].Email){
            user_index = i;
            break;
        }
    }
    if(user_index==-1){
        res.status(201).json({
            msg:"not a valid user"
        })
    }
    let product_index = -1;
    for(let i = 0 ; i < product_database[user_index].Products.length ;i++){
        if(product_database[user_index].Products[i].ProductName==req.body.ProductName){
            product_index = i ;
            break;
        }
    }
    if(product_index==-1){
        res.status(201).json({
            msg:"not a valid product"
        })
    }
    product_database[user_index].Products[product_index].review.push({
        by : req.user.UserId,
        review : req.body.Review
    })
    let curr = product_database[user_index].Products[product_index].rating ;
    let count = product_database[user_index].Products[product_index].sold ;
    let total = parseInt(curr) * parseInt(count) + parseInt(req.body.Rating);
    curr = (total / (count + 1)).toFixed(2);
    product_database[user_index].Products[product_index].rating = curr;
    product_database[user_index].Products[product_index].sold = count+1;
    writeDatabase(ProductFile,product_database);
    return res.status(200).json({
        msg : "Successfully updated"
    })
}

const GetChat = function(req,res){
    const chatDatabase = readDatabase(ChatFile);
    for(let i = 0 ; i < chatDatabase.length ;i++){
        if(chatDatabase[i].ChatId==req.body.ChatId){
            res.status(200).json({
                msg:"Done",
                chats : chatDatabase[i].Chats
            })
        }
    }
    res.status(200).json({
        msg:"Not Done",
        chats : []
    })
}

const addChat = function(req,res){
    const chatDatabase = readDatabase(ChatFile);
    const login_database = readDatabase(LoginFile);

    let name = "Unknown";
    for(let i = 0 ; i < login_database.length ; i++){
        if(login_database[i].UserId==req.user.UserId){
            name = login_database[i].Name
            break;
        }
    }

    for(let i = 0 ; i < chatDatabase.length ;i++){
        if(chatDatabase[i].ChatId==req.body.ChatId){
            const newChat = {
                person : name,
                chat : req.body.msg
            }
            chatDatabase[i].Chats.push(newChat);
            writeDatabase(ChatFile,chatDatabase);
            res.status(200).json({
                msg : "added"
            })
        }
    }
    res.status(201).json({
        msg:"Not Done"
    })
}

const FileUpload = function(req,res){
    if (!req.file) {
        return res.status(400).json({
            msg : 'No file uploaded'});
    }
    res.json({ 
        path: `/Functions/Database/Uploads/${req.file.filename}` ,
        msg :"uploaded"
    });
}
 

module.exports = {Login,SignUp,UpdateProfile,ChangePassword,AccountDelete,AddProduct,UpdateProduct,DeleteProduct,AllProducts,YourProducts,ProductBuying,Approving,GetQuery,GetSamples,YourBoughtProducts,reviewSystem,GetChat,addChat,FileUpload};
