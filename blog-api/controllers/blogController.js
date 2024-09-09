const express = require('express');
//const passport = require('passport');
const passport = require('../middleware/passport');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
  res.json(blog);
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: req.user.id,
      },
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedBlog = await prisma.blog.update({
    where: { id: parseInt(id) },
    data: { title, content }
  });
  res.json(updatedBlog);
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id: parseInt(id) } });
    //res.status(204).send();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
