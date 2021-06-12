import React from "react"
import '../style.css'

class MemeGenerator extends React.Component{
    constructor()
    {
        super()
        this.state = {
            topText : "",
            bottomText : "",
            randomImg : "https://i.imgflip.com/1bij.jpg",
            allMemes : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({allMemes: memes})
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.allMemes.length)
        console.log(randomNum)
        const randImg = this.state.allMemes[randomNum].url
        this.setState({randomImg: randImg})
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit = {this.handleSubmit}>
                    <input
                        type = "text"
                        name = "topText"
                        value = {this.state.topText}
                        onChange = {this.handleChange}
                        placeholder = "Enter Top Text"
                    />
                    <input
                        type = "text"
                        name = "bottomText"
                        value = {this.state.bottomText}
                        onChange = {this.handleChange}
                        placeholder = "Enter Bottom Text"
                    />
                    <input type = "submit" value = "Generate" name = "submit" />
                </form>
                <div className="meme">
                    <h2 className="topText">
                        {this.state.topText}
                    </h2>
                    <img className = "meme-img" src = {this.state.randomImg} alt = ""/>
                    <h2 className="bottomText">
                        {this.state.bottomText}
                    </h2>
                </div>
            </div>
        )
    }

}
export default MemeGenerator