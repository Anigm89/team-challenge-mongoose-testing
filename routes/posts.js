const express = require("express");
const router = express.Router();
const Post = require('../models/post.js');

router.use(express.json());


router.post('/create', async (req, res) =>{
    try{
        const post = await Post.create(req.body);
        res.status(201).send(post);
    }
    catch(error){
        console.error(error);
        res.status(500).send({mensaje:'error al crear una nuevo post'})
    }
});

router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.status(201).send(posts);
    }
    catch(error){
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener las publicaciones' });
    }
   
});

//paginacion 10-10
router.get('/postsWithPagination', async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;

        const posts = await Post.find().skip(startIndex).limit(pageSize);
        res.status(201).send(posts);
    }
    catch(error){
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener las publicaciones' });
    }
   
});

router.get('/id/:_id', async (req, res) => {
    try{
        const id = req.params['_id'];
        const postId = await Post.findById(id);
        if (!postId) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }
        res.status(201).send(postId)
    }
    catch(error){
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener las publicaciones por id' });
    }
});

router.get('/title/:title', async (req, res) => {
    try{
        const title = req.params['title'];
        const postTitle = await Post.find({title: title});
        if (!postTitle) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }
        res.status(201).send(postTitle)
    }
    catch(error){
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener las publicaciones por nombre' });
    }
});


router.put('/id/:_id', async (req, res) => {
    try{
        const id = req.params['_id'];
        const updatePost = await Post.findByIdAndUpdate(id, {title: req.body.title, body: req.body.body}, {new: true});
        if(!updatePost){
            return res.status(404).send({mensaje:'Publicación no encontrada'});
        }
        res.send(updatePost);
    }
    catch(error){
        console.error(error);
        res.status(500).send({ mensaje: 'Error al actualizar la publicación' });
    }
});


router.delete('/id/:_id', async (req, res) =>{
    try{
        const id = req.params['_id'];
        const deletePost = await Post.findByIdAndDelete(id);

        if(!deletePost){
            return res.status(404).send({mensaje: 'Publicación no encontrada'})
        }
        res.send({mensaje:'Post eliminado'})
    }
    catch(error){
        console.error(error);
        res.status(500).send({ mensaje: 'Error al borrar la publicación' });
    }
});


module.exports = router;
