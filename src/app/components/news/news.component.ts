import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    articles = null;
    numArticles = 4;
    maxArticles = 0;

    constructor(){
        this.searchNews();
    }

    ngOnInit(): void{
    }

    searchNews = async () =>{
        // NY Times API
        // https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=l0pE8ZYsNeEx6MAKnAyKmNnxJrOhAfCB
        // https://api.nytimes.com/svc/topstories/v2/all.json?api-key=l0pE8ZYsNeEx6MAKnAyKmNnxJrOhAfCB
        //
        // all, arts, books, business, health, magazine, movies, opinion,
        // science, technology, travel, us, world

        let url;
        url = "https://api.nytimes.com/svc/topstories/v2/us.json?api-key=l0pE8ZYsNeEx6MAKnAyKmNnxJrOhAfCB"
        url = "https://api.nytimes.com/svc/news/v3/content/nyt/all.json?api-key=l0pE8ZYsNeEx6MAKnAyKmNnxJrOhAfCB";

        try{
            await fetch(url)
                .then( response => response.json() )
                .then( data => {

                    this.maxArticles = data.num_results;
                    this.articles = data.results.slice(0, this.numArticles);

                    console.log("NY Times articles => ", this.articles)
                });
        }catch(error){
            console.log("searchNews =>", error);
        }
    }

    loadMore = () => {
        this.numArticles += 4;
        this.searchNews();
    }

    allArticles = () => {
      this.numArticles = this.maxArticles;
      this.searchNews();
  }
}



