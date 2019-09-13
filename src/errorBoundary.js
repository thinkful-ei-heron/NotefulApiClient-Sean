import React , {Component} from 'react'

class ErrorBoundary extends Component {

    state={
        error:null
    }

    static getDerivedStateFromError(error){
        return {error}
    }

    render(){
        if (this.state.error){ 
        return (
            <main className = "error-page">
                <h1>There was an error somewhere...</h1>
                <p>Please try refreshing the page</p>
            </main>
        )
        }
        return(this.props.children)
    }
    
}

export default ErrorBoundary