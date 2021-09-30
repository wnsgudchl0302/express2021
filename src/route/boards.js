import { Router } from "express";
import _ from "lodash";

const boardRrouter = Router();

let boards = [
    {
        id : 1,
        title : "게시판 타이틀입니다.",
        content : "내용일껄",
        createDate : "2021-09-05",
        updateDate : "2021-09-05"
    },
    {
        id : 2,
        title : "게시판 타이틀입니다.",
        content : "내용일껄",
        createDate : "2021-09-05",
        updateDate : "2021-09-05"
    },
    {
        id : 3,
        title : "게시판 타이틀입니다.",
        content : "내용일껄",
        createDate : "2021-09-05",
        updateDate : "2021-09-05"
    },
    {
        id : 4,
        title : "게시판 타이틀입니다.",
        content : "내용일껄",
        createDate : "2021-09-05",
        updateDate : "2021-09-05"
    },
]


boardRrouter.get("/", (req, res) => {
    res.send({
        count: boards.length,
        boards
    });
});


boardRrouter.get("/:id", (req, res) => {
    const findBoard = _.find(boards, { id: parseInt(req.params.id)});
    let msg;
    if(findBoard){
        msg = "정상적으로 조회되었습니다."
        res.status(200).send({
            msg,
            findBoard
        });
    } else {
        msg = "해당 아이디를 가진 게시판이 없습니다.";
            res.status(400).send({
            msg,
            findBoard
        });
    }
});

boardRrouter.post("/", (req, res) => {
    const createBoard = req.body;
    const check_board = _.find(boards, ["id", createBoard.id]);
    let result;
    if(!check_board && createBoard.id && createBoard.title && createBoard.content){
        boards.push(createBoard);
        result = `${createBoard.title}제목의 게시판을 생성 했습니다.`
    } else {
        result = '입력 요청값이 잘못되었습니다.'
    }
    res.status(201).send({
        result
    });
});



boardRrouter.put("/:id", (req, res) => {
    const findBoard = _.find(boards, {id:  parseInt(req.params.id)});
    let result;
    if(boards && findBoard){
        findBoard.content = req.body.content;
        result = "변경"
    }else{
        result = "오류"
    }
    res.send({
        result
    });
});


boardRrouter.delete("/:id", (req, res) => {
    let findBoard = _.find(boards, {id:  parseInt(req.params.id)});
    let result;
    if( boards && findBoard){
        boards = _.reject(boards, {"id": parseInt(req.params.id)})
        result = "삭제"

    }else{
        result = "오류"
    }
    res.send({
        result
    });
});

export default boardRrouter;