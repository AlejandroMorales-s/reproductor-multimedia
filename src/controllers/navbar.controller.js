import navbar from '../views/navbar.html';
import variables from '../globalVariables';
let {subscriptions} = variables;
const users = require('../users.json');
//* Icons
import home from '../assets/icons/home.svg';
import subs from '../assets/icons/subscriptions.svg';
import like from '../assets/icons/like.svg';
import headphones from '../assets/icons/headphones.svg';
import account from '../assets/icons/account.svg';
import logout from '../assets/icons/logout.svg';
import searchIcon from '../assets/icons/search.svg';

const navbarContainer = document.getElementById('navbar-bg');

const hamburgerMenuButtons = [
    {
        name: 'Home',
        href: '#/',
        icon: home
    },
    {
        name: 'Subscriptions',
        href: '#/subscriptions',
        icon: subs
    },
    {
        name: 'Videos liked',
        href: '#/liked',
        icon: like
    },
    {
        name: 'Music',
        href: '#/music',
        icon: headphones
    }
];

const profileMenuButtons = [
    {
        name: 'My channel',
        href: '#/Alejandro Morales',
        icon: account
    },
    {
        name: 'Logout',
        href: '#/logout',
        icon: logout
    }
];

const creator = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};

const addButtons = (container, array, attribute) => {
    array.map(button => {
        let element = `
        <a class='${attribute}' href="${button.href}">
            ${button.icon}
            <li>
                ${button.name}
            </li>
        </a>
        `;
        container.innerHTML += element;
        });
};

const addSubscriptions = (container) => {
    subscriptions.map(sub => {
        let user = creator(sub);
        const {name, profile_pic} = user;
        let element = `
            <a href='${`#/${name}`}'>
                <div class='subscription-card-navbar'>
                    <div class='subscription-card-navbar-img-container'>
                        <img src=${profile_pic}>
                    </div>
                    <p class="subscription-card-navbar-name">${name}</p>
                </div>
            </a>
        `;
        container.innerHTML += element;
    });
};

export default () => {
    const div = document.createElement('div');
    div.innerHTML = navbar;
    navbarContainer.appendChild(div);
    
    //* Elements
    const buttonsContainer = document.getElementById('navbar-buttons-container');
    const profileButtonsContainer = document.getElementById('profile-buttons-container');
    
    const hamburgerIcon = document.getElementById('hamburger-menu-icon');
    const navbarButtons = document.getElementById('navbar-buttons');

    const profileMenu = document.getElementById('profile-button');
    const profileButtons = document.getElementById('nav-profile-menu');
    
    const profileImg = document.querySelectorAll('.profile-img');

    const inputContainer = document.getElementById('navbar-input-container');

    const subscriptionsContainer = document.getElementById('subscriptions-container-navbar');

    //* Search icon

    const divSearchIcon = document.createElement('div');
    divSearchIcon.innerHTML = searchIcon;

    inputContainer.appendChild(divSearchIcon);


    //* Add buttons
    addButtons(buttonsContainer, hamburgerMenuButtons, 'navbar-button');
    addButtons(profileButtonsContainer, profileMenuButtons, 'profile-button');
    
    //* Add event listeners on hamburger menus
    const menuButtons = [
        {
            container: hamburgerIcon,
            menu: navbarButtons,
        }, 
        {
            container: profileMenu,
            menu: profileButtons,
        }
    ];

    menuButtons.forEach(button => {
        button.container.addEventListener('click', () => {
            button.container === hamburgerIcon ? 
            button.menu.classList.toggle('show')
            : button.menu.classList.toggle('show-profile-menu');

            button.menu.classList.toggle('hidden');
        });
    });

    //* Add src to profile img
    profileImg.forEach(img => {
        img.setAttribute('src', 'https://scontent.fmex31-1.fna.fbcdn.net/v/t1.6435-9/73117783_2530202380535334_6358232631099785216_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeEgqbJAC9eL_8TShynDpCzrPDwTlZ_9iy88PBOVn_2LL20wpPdZVYkmXbzW0IMbxIWRndvAk9lRje-h7imbxVPi&_nc_ohc=KLP_w6djpiMAX9nKqHV&_nc_ht=scontent.fmex31-1.fna&oh=00_AT9Iq7WSuGKKzhAJJ8b73Rwc7fQEtOYRBXPSc9nADrVmIg&oe=62DA0494');
    });

    document.addEventListener('click', () => {
        subscriptionsContainer.innerHTML = '';
        addSubscriptions(subscriptionsContainer);
    });

        
    return navbarContainer;
};