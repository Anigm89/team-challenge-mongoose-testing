const request = require("supertest");
const app = require("./index.js");
const Post = require('./models/post.js');
const { beforeEach } = require("node:test");


describe("test post", () => {

    const post = {
        title: "test1",
        body: "body test 1"
    };

    it("Create post", async () => {
        await Post.deleteMany(); // borra la bbdd antes de hacer test

        let postCount = await Post.countDocuments({});
        expect(postCount).toBe(0);
        const resPost = await request(app).post("/create").send(post).expect(201);

        postCount = await Post.countDocuments({});
        expect(postCount).toBe(1);
        expect(resPost.body).toHaveProperty('_id');
        expect(resPost.body).toHaveProperty('title', post.title);
        expect(resPost.body).toHaveProperty('body', post.body);

    });

    afterEach(async() => {
        await Post.deleteMany();
    });
});


/*
describe("test get", () => {

    beforeEach(async() => {
        await Post.deleteMany();
        await Post.create({title: "Post 1", body: "body post 1"});
        await Post.create({title: "Post 2", body: "body post 2"});
    });


    it("get post", async () => {
     
        let postCount = await Post.countDocuments({});
        expect(postCount).toBe(2);
        const resPost = await request(app).get("/");
        expect(resPost.body[0]).toHaveProperty('title', 'Post 1');


    });


});
*/