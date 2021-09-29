import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

  }
  
  componentDidMount(){
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {this.setState({posts: res.data})})
  }

  updatePost = (id,text) => {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => {this.setState({posts: res.data})})
  }

  deletePost = (id) => {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => {this.setState({posts: res.data})})
  }

  createPost = (text) => {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(res => {this.setState({posts: res.data})})
  }

  filterPost = (text) => {
    let value = text.target.value
    const encoded = encodeURI(value)
    if (value){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encoded}`)
    .then(res => {this.setState({posts: res.data})})
    .catch((e) => console.log(e))
  } else {
    axios.get('ttps://practiceapi.devmountain.com/api/posts')
    .then(res => {this.setState({posts: res.data})})
  }
  }  

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPostFn={this.filterPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(post => 
          <Post 
          key={post.id} 
          text={post.text} 
          date={post.date} 
          updatePostFn={this.updatePost} 
          id={post.id} 
          deletePostFn={this.deletePost} 
          />)}
 
        </section>
      </div>
    );
  }
}

export default App;
