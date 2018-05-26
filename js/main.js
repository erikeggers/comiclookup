let apiKey = 'a4bf5183ed7a55cb90844ebdf3b57749e4eeed93';
let keywords;

//Capture search keywords
document.querySelector(".search").addEventListener('submit', function(event){
    event.preventDefault();
    keywords = document.querySelector('#search-input').value;
    localStorage.setItem('searchValue', keywords);
    console.log(localStorage.getItem('searchValue'));

        var appEl = document.getElementById('results');

        if (!appEl) {
            var container = document.querySelector(".search-results");
            container.setAttribute('id', 'results');
        }
        renderIssues(keywords);

});


var renderIssues = () => {
    let url = 'https://comicvine.gamespot.com/api/issues/?api_key=' + apiKey + '&filter=name:' + keywords + '&number_of_page_results=10&format=json'
    //url=`https://comicvine.gamespot.com/api/issues/?api_key='${apiKey}'&filter=name:${keywords}&format=json`
    console.log(url)
    const issueResults = new Vue({
        el: '#results',
        data: {
            issues: [],
        },
        mounted () {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.issues = data
            })
        },

        template: `
        <div class="row search-results">
           <div class="card-deck">
                <div v-for="issue in issues.results" class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
                    <div>
                    <a :href="issue.site_detail_url" target="_blank" class="card border-0 mb-5 item-card text-dark">
                        <img :src="issue.image.thumb_url" :alt="issue.name" class="card-img-top">
                        <div class="card-body">
                            <p>{{ issue.name }}</p>   
                        </div>
                    </a>
                </div>
                </div>
            </div>
            </div>
        `,
    })
}

/*

			<!-- <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
				<a href="details.html" class="card border-0 mb-5 item-card text-dark">
					<img src="images/batman.jpg" alt="" class="card-img-top">
					<div class="card-body">
						<h3 class="card-title">Title</h3>
						<p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
					</div>
				</a>
			</div>

      <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <a href="details.html" class="card border-0 mb-5 item-card text-dark">
                <div class="card-body">
                    <h3 v-for="issue in issues.results class="card-title">{{ issue.name }}</h3>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>
            </a>
        </div>


*/