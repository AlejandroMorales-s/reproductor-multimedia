import navbar from '../views/navbar.html';
//* Icons
import home from '../assets/icons/home.svg';
import subscriptions from '../assets/icons/subscriptions.svg';
import like from '../assets/icons/like.svg';
import headphones from '../assets/icons/headphones.svg';
import account from '../assets/icons/account.svg';
import logout from '../assets/icons/logout.svg';

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
        icon: subscriptions
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
        href: '#/my-channel',
        icon: account
    },
    {
        name: 'Logout',
        href: '#/logout',
        icon: logout
    }
];

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
        img.setAttribute('src', 'https://source.unsplash.com/user/alan');
    });
        
    return navbarContainer;
};