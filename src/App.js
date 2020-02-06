import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./components/searchbar/Searchbar"
import ImageGallery from "./components/imageGallery/ImageGallery";
import css from "./style.module.css"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Modal from "./components/modal/Modal"

const APIkey = "15153445-23879ff55371ef06c5f70070f";

class App extends Component {
  state = { inputValue: "",
   pageRa: 1,
searchImage:[],
spinnerON:false,
openModalWind:false,
srcImg:"",
btnLoadMore:false,
 };
  inputOnChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value
    });
  };
  searchValue = e => {
    e.preventDefault();
    this.setState({
      searchImage:[],
      spinnerON: true,
      pageRa: 1,
    })
    const value = this.state.inputValue;
    const pageLoad = 1;
    if(value===""){
      return
    }else{
    axios
      .get(
        "https://pixabay.com/api/?q=" +
          value +
          "&page=" +
          pageLoad +
          "&key=" +
          APIkey +
          "&image_type=photo&orientation=horizontal&per_page=12"
      )
      .then(res => this.setState(prev=>({
        btnLoadMore: true,
        searchImage: [...prev.searchImage,...res.data.hits]}))).finally(this.setState({spinnerON: false}))
  }}
  loadMore = e => {
    this.setState({
      spinnerON: true,
    })
    this.setState(prev => ({
      pageRa: prev.pageRa + 1,
    }));
    const value = this.state.inputValue;
    const pageLoad = this.state.pageRa + 1;
    axios
      .get(
        "https://pixabay.com/api/?q=" +
          value +
          "&page=" +
          pageLoad +
          "&key=" +
          APIkey +
          "&image_type=photo&orientation=horizontal&per_page=12"
      )

      .then(res =>{if(res.data.hits.length !==0){ this.setState(prev=>({
        btnLoadMore: true,
        searchImage: [...prev.searchImage, ...res.data.hits]}))}else{ this.setState(prev=>({
          btnLoadMore: false,
          searchImage: [...prev.searchImage, ...res.data.hits]}))}}).finally(()=>{this.setState({spinnerON: false})
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      
      })
 
      
  };
  pressKeyCLose=(e)=>{
    if(e.code === 'Escape'){
      this.setState({
        openModalWind:false
      })
    }
  }
  openModal=(e)=>{
    const srcImgopen= e.target.src;
    this.setState({
      openModalWind:true,
      srcImg: srcImgopen,
    })
    window.onkeydown = this.pressKeyCLose;
  }
  closeModal=(e)=>{
    this.setState({
      openModalWind:false
    })
  }

  render() {
    return (
    <>
    {this.state.openModalWind ? <Modal  srcImg={this.state.srcImg} closeModal={this.closeModal} pressKeyCLose={this.pressKeyCLose}/>: null}
    {this.state.spinnerON ?(<Loader  className={css.Loader}type="MutatingDots" color="orange" height={80} width={80}timeout={3000}/>) : null}
        <Searchbar  searchValue={this.searchValue} inputOnChange={this.inputOnChange} />
        <ImageGallery  searchImage={this.state.searchImage} openModal={this.openModal}/> 

       {this.state.btnLoadMore&& this.state.searchImage.length>11? <button onClick={this.loadMore} className={css.Button}>LOAD MORE</button> : null}
      </>
    )
  }
}

export default App;
