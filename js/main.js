 

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  // preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }






  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });






  // menu responsivo
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });







  // botão de scroll
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }








  // serve para exibir imagens e vídeos em um lightbox responsivo e bonito
  const glightbox = GLightbox({
    selector: '.glightbox'
  });








  // animação de scroll
  function aos_init() {
    AOS.init({
      duration: 1500,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});









// adiciona um anime à lista local de animes armazenada no navegador, e também uma mensagem
document.addEventListener('DOMContentLoaded', function() {
  const addToListBtn = document.getElementById('addToListBtn');
  const animeTitle = document.getElementById('animeTitle').textContent;
  const animeCover = document.getElementById('animeCover').src;

  addToListBtn.addEventListener('click', function() {
    addAnimeToList(animeTitle, animeCover);
    showNotification('Foi adicionado à sua lista!');
  });

  function addAnimeToList(title, cover) {
    let animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    animeList.push({ title: title, cover: cover });
    localStorage.setItem('animeList', JSON.stringify(animeList));
  }

  function showNotification(message) {
    alert(message); // alerta para notificação
    // Você pode substituir por um modal ou um aviso personalizado se preferir!!!!!!!!!!!!!!!!!!!!!!!
  }
});






// exibe os itens de anime salvos e permite que o usuário os remova da lista quando desejar
document.addEventListener('DOMContentLoaded', function() {
  const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
  const listContainer = document.getElementById('animeList');

  animeList.forEach((anime, index) => {
    const listItem = document.createElement('div');
    listItem.classList.add('anime-item');

    const animeCover = document.createElement('img');
    animeCover.src = anime.cover;
    animeCover.alt = anime.title;
    animeCover.classList.add('anime-cover');

    const animeTitle = document.createElement('p');
    animeTitle.textContent = anime.title;
    animeTitle.classList.add('anime-title');


    // botão de exclusão representado por um elemento button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
      removeAnimeFromList(index);
      listItem.remove();
      showNotification('Anime removido da lista!');
    });

    // adiciona todos os elementos criados na lista
    listItem.appendChild(animeCover);
    listItem.appendChild(animeTitle);
    listItem.appendChild(deleteBtn);
    listContainer.appendChild(listItem);
  });










  // função para remover um anime da lista
  function removeAnimeFromList(index) {
    let animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    animeList.splice(index, 1);
    localStorage.setItem('animeList', JSON.stringify(animeList));
  }

  function showNotification(message) {
    alert(message); // alerta para notificação
    // Você pode substituir por um modal ou um aviso personalizado se preferir!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
});












// função de pesquisa em tempo real para filtrar os itens
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const animeList = document.getElementById('animeList');

// adiciona um listener de evento de input ao campo de pesquisa
searchInput.addEventListener('input', function() {
const searchTerm = searchInput.value.toLowerCase(); // Obtém o texto digitado e converte para minúsculas
const animeItems = animeList.querySelectorAll('.anime-item'); // Seleciona todos os itens de anime

// itera sobre cada item de anime
animeItems.forEach(function(animeItem) {
const title = animeItem.querySelector('.anime-title').textContent.toLowerCase(); // obtém o título do anime e converte para minúsculas

// verifica se o título do anime contém o termo de pesquisa
if (title.includes(searchTerm)) {
animeItem.style.display = 'block'; // exibe o item de anime se o título corresponder ao termo de pesquisa
} 
else {
animeItem.style.display = 'none'; // oculta o item de anime se o título não corresponder ao termo de pesquisa
}
  });
});
});





function selectProfilePic(src) {
  document.getElementById('profilePic').src = src;
  localStorage.setItem('profilePic', src);
}

function selectHeaderPic(src) {
  document.getElementById('profileHeader').style.backgroundImage = `url('${src}')`;
  localStorage.setItem('profileHeader', src);
}

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('usernameInput').value;
  if (username) {
    document.getElementById('profileName').textContent = username;
    localStorage.setItem('profileName', username);
  }
  // Fechar modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
  modal.hide();
});

// Carregar dados do localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', (event) => {
  const profilePic = localStorage.getItem('profilePic');
  if (profilePic) {
    document.getElementById('profilePic').src = profilePic;
  }

  const profileHeader = localStorage.getItem('profileHeader');
  if (profileHeader) {
    document.getElementById('profileHeader').style.backgroundImage = `url('${profileHeader}')`;
  }

  const profileName = localStorage.getItem('profileName');
  if (profileName) {
    document.getElementById('profileName').textContent = profileName;
  }
});