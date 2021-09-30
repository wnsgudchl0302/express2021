import { Router } from "express";
import _ from "lodash";
import sequelize from "sequelize";
import faker from "faker";
faker.locale = "ko";

const seq = new sequelize('express', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});


const check_sequelize_auth = async () => {
    try {
        await seq.authenticate();
        console.log("연결 성공");
    } catch (err) {
        console.log("연결 실패: ", err);
    }
};

check_sequelize_auth();

const User = seq.define("user", {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    age: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

const user_sync = async () => {
    try {
        await User.sync({ force: true });
        for (let i = 0; i < 100; i++) {
            User.create({
                name: faker.name.lastName() + faker.name.firstName(),
                age: getRandomInt(15, 50)
            });
        }
    } catch {

    }
}
//user_sync();

// User.sync({ force: true }).then(()=>{
//     return User.create({
//         name: faker.name.lastName()+faker.name.firstName(),
//         age: getRandomInt(15,50)
//     });
// }).then(()=>{
//     return User.create({
//     name: faker.name.lastName()+faker.name.firstName(),
//     age: getRandomInt(15,50)
//     });
// });

const userRrouter = Router();

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


// let user;
// let users = [];

// for (let i = 1; i < 10000; i +=1){
//     users.push({
//         id: i,
//         name: faker.name.lastName()+faker.name.firstName(),
//         age: getRandomInt(15,50),
//     })
// }
console.log("준비됨")

userRrouter.get("/", async (req, res) => {
    let { name, age } = req.query;
    const { Op } = sequelize;
    const result = await User.findAll({
        attributes: ['name', 'age'],
        where: {
            [Op.and]: [
                { age: 21 },
                {}
            ]
        }
    });
    // let filteredUsers = users;
    // if(name){
    //     filteredUsers = _.filter(filteredUsers, (user)=>{
    //         return user.name.includes(name);
    //     });
    // }
    // if(age){
    //     filteredUsers = _.filter(filteredUsers, ['age', parseInt(age)]);
    // }

    // res.send({
    //     count: filteredUsers.length,
    //     filteredUsers
    // });
    res.send({
        result
    })
});



userRrouter.get("/:id", (req, res) => {
    const findUser = _.find(users, { id: parseInt(req.params.id) });
    let msg;
    if (findUser) {
        msg = "정상적으로 조회되었습니다."
        res.status(200).send({
            msg,
            findUser
        });
    } else {
        msg = "해당 아이디를 가진 유저가 없습니다.";
        res.status(400).send({
            msg,
            findUser
        });
    }
});




//유저생성
userRrouter.post("/", (req, res) => {
    const createUser = req.body;
    const check_user = _.find(users, ["id", createUser.id]);
    let result;
    if (!check_user && createUser.id && createUser.name && createUser.age) {
        users.push(createUser);
        result = `${createUser.name}님을 생성 했습니다.`
    } else {
        result = '입력 요청값이 잘못되었습니다.'
    }
    res.status(201).send({
        result
    });
});

userRrouter.put("/:id", (req, res) => {
    const findUser = _.find(users, { id: parseInt(req.params.id) });
    let result;
    if (users && findUser) {
        findUser.name = req.body.name;
        result = "변경"
    } else {
        result = "오류"
    }
    res.send({
        result
    });
});

userRrouter.delete("/:id", (req, res) => {
    let findUser = _.find(users, { id: parseInt(req.params.id) });
    let result;
    if (users && findUser) {
        _.reject(users, { id: findUser.id })
        findUser = null;
        result = "삭제"

    } else {
        result = "오류"
    }
    res.send({
        result
    });
});

userRrouter.get("/test/:id", async (req, res) => { 
    try { res.status(200).send(true) } 
    catch (err) { console.log(err) 
        res.status(500).send({ msg: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요." }) } });


export default userRrouter;