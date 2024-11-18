let searchValueDiv, searchRight = document.getElementById('searchRight');; 
let showAllID = false;
let sum =0;
const sumDiv = document.getElementById('sum');
sumDiv.innerHTML = `${sum}`;

const onTable = (title, comment_count) =>{
    const tb = document.getElementById('orderTable');
    let tr = document.createElement('tr');
    const th = document.createElement('th');
    tr.innerHTML=`<td>${title}</td>
                <td>${comment_count}</td>`;
    tb.appendChild(tr);
    // console.log(typeof parseInt(comment_count));
    sum += parseInt(comment_count);
    sumDiv.innerHTML = `${sum}`;
    if(sum>0) {
        const orderNow=document.getElementById('orderNow');
        orderNow.classList.remove('cursor-not-allowed'); 
        orderNow.classList.add('btn-primary');
    }
}


const loadPost = (searchValueDiv,showAllID) =>{
    let search;

    searchValueDiv.value == '' ? search = 'allPosts' : search = searchValueDiv.value ;

    searchValueDiv.value = '';
    // searchRight.classList.add("hidden");
    searchRight.innerText ='';

    fetch(`${search}.json`)
    .then (res => res.json())
    .then (data => {showPost(data.posts,showAllID);})
}

const handleShowModal = (title, category, image,comment_count, description, view_count,author_name) =>{
    // console.log(post);
    const dialogue = document.getElementById('my_modal_5');
    dialogue.innerHTML =`<div class="modal-box">
        <img src='${image}' class="w-[200px]"> </img>
        <h3 class="text-lg">Title: <span class="font-bold"> ${title} </span></h3>
        <div class="badge badge-secondary">${category} </div>
        <p>Description: <span class="font-bold"> ${description} </span> </p> 
        <p>Author Name: <span class="font-bold"> ${author_name} </span></p>
        <div class="justify-end">
            <div class="badge badge-outline">Price: <span class="font-bold"> ${comment_count}$ </span></div>
            <div class="badge badge-outline">Views: <span class="font-bold"> ${view_count} </span></div>
        </div>

        <div class="modal-action">
        <form method="dialog">
            <button class="btn">Close</button>
        </form>
        </div>
    </div>`
    dialogue.showModal();

}

const showPost = (posts,showAllID) =>{
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    const showAllBtn = document.getElementById('showAll');

    const postsContainer = document.getElementById('postContainer');
    const categoryTitle = document.getElementById('categoryTitle');

    if(posts.length === 6) categoryTitle.innerHTML='All Categories';
    else categoryTitle.innerHTML=`${posts[0].category}`;

    let posts2 ;
   if(posts.length > 2 && !showAllID){posts2 = posts.slice(0,2); showAllBtn.classList.remove('hidden');}
    else {
        showAllBtn.classList.add('hidden'); posts2 = posts;
    }

    console.log(posts2);
    postsContainer.innerHTML = '';
    posts2.forEach((post) => {
        const postContainer = document.createElement('div');
        postContainer.classList= 'card bg-base-100  w-72 shadow-xl mt-10 hover:border-4';
        postContainer.innerHTML = `<div>
            <figure> <img src=${post.image} alt="courses"class="w-64 h-60"/> </figure>
            <div class="card-body">
              <h2 class="card-title h-28">
                ${post.title}
                <div class="badge badge-secondary">${post.category}</div>
              </h2>
              <p class="h-24">${post.description}</p>

              <div class="card-actions justify-end flex items-center">
                <div class="badge badge-outline">${post.comment_count}$</div>
                <button onclick="handleShowModal('${post.title}','${post.category}','${post.image}','${post.comment_count}', '${post.description}', '${post.view_count}', '${post.author.name}')" class="btn border-blue-700 border-2">Details </button> 
              </div>

              <button class="btn border-blue-300 border-2 btn-primary" onclick="onTable('${post.title}','${post.comment_count}')">Click to Buy </button> 
            </div>
          </div>`
          postsContainer.appendChild(postContainer);
        }

    );
}

const showAll = () => {
    showAllID = true;
    // console.log(showAllID);
    handleSearch(showAllID);
}

const handleSearch = (showAllID) => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');

    searchValueDiv = document.getElementById('search_post');

    loadPost(searchValueDiv,showAllID); 
}

handleSearch();

const footerBtn = () =>{
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
}
const getStarted = () =>{
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

const searchClick =() =>{
    searchRight.innerHTML = `search 'web', 'javascript' or 'python'
    because we don't have api. Used json file`;
}

const aboutUs = () =>{
    document.getElementById('aboutUsID').scrollIntoView({ behavior: 'smooth' });
}

const loginAlert = () => {
    alert("Successfully Logged In!!");
}

const orderNowAlert = () =>{
    alert("Order completed!!");
}
