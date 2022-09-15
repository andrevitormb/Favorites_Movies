import { ApiMovie } from "./ApiMovie.js"

export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

    }

    load (){
        this.entries = JSON.parse(localStorage.getItem('@movies-favorites')) || []
    }

    save(){
        localStorage.setItem('@movies-favorites', JSON.stringify(this.entries))
    }

    async add(namemovie){
        try{
        const movie = await ApiMovie.search(namemovie)
        
        if(movie.Title === undefined){
            throw new Error('Movie do not exist')
        }

        this.entries = [movie, ...this.entries] 
        this.update()
        this.save()

        }catch(error){
            alert(error.message)
        }
    }

    delete(movie){
        const filteredEntries = this.entries.filter(entry => entry.Title ==! movie.Title)

        this.entries = filteredEntries
        this.update()
        this.save()
    }

}

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector('table tbody')
    
    this.update()
    this.onadd()

    }

    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = ()=>{
            const {value} = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update(){
        this.removeAllTr()
        
        this.entries.forEach(movie =>{
            const row = this.createRow()

            row.querySelector('.movie img').src = movie.Poster
            
            row.querySelector('.movie p').textContent = movie.Title

            row.querySelector('.released').textContent = movie.Released
            
            row.querySelector('.imdbRating').textContent = movie.imdbRating

            row.querySelector('.remove').onclick = ()=> {
                const isOK = confirm('Are you sure you want to remove this movie')

                if(isOK){
                    this.delete(movie)
                }
            }

            this.tbody.append(row)
        })

    }

    createRow(){
        const tr = document.createElement("tr")
  
       tr.innerHTML = `
    
       <td class="movie">
          <img src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" alt="">
          <p>Guardians of the Galaxy</p>
       </td>
       <td class="released">05 May 2017</td>
       <td class="imdbRating">7.6</td>
       <td class="remove">&times;</td>
      
      `
      return tr

    }

    removeAllTr(){

        this.tbody.querySelectorAll('tr')
        .forEach((tr)=>{
            tr.remove()
        })

    }
}