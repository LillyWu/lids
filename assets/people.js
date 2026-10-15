
const sections = [
  {
    title: 'Principal Investigator',
    people: [
      {
        name: 'Li (Lilly) Wu',
        photo: 'Lilly_Wu.jpg',
        email: 'lwu15@ualberta.ca',
        position: 'Incoming Assistant Professor',
        affiliation: 'Department of Computing Science, University of Alberta',
        scholar: 'https://scholar.google.com/citations?user=K6KmzXgAAAAJ',
        linkedin: 'https://www.linkedin.com/in/li-lilly-wu-32a24bba/',
        bio: 'Li (Lilly) Wu is an incoming Assistant Professor in the Department of Computing Science at the University of Alberta. She received her Ph.D. from Technische Universität Berlin and was a Postdoctoral Researcher at the University of Massachusetts Amherst. Her research focuses on building reliable, secure, and sustainable distributed systems across cloud, edge, and IoT environments. Drawing on her experience in both academia and industry, including roles at IBM Cloud and Bosch Research, she addresses fundamental systems challenges motivated by real-world operational needs. Outside of research, she enjoys running, taking long walks, visiting art museums, and listening to classical music and jazz.'
      }
    ]
  },
  {
    title: 'Postdoctoral Researchers',
    people: [
      {
        name: 'Postdoctoral Researcher',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      }
    ]
  },
  {
    title: 'Graduate Students',
    people: [
      {
        name: 'Graduate Student 1',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      },
      {
        name: 'Graduate Student 2',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      },
      {
        name: 'Graduate Student 3',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      },
      {
        name: 'Graduate Student 4',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      }
    ]
  },
  {
    title: 'Undergraduate Students',
    people: [
      {
        name: 'Undergraduate Student',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      }
    ]
  },
  {
    title: 'Visitors',
    people: [
      {
        name: 'Visiting Researcher',
        photo: 'placeholder-person.svg',
        email: '',
        bio: ''
      }
    ]
  }
];

const directory = document.querySelector('#people');

// Helper function to create HTML elements
function element(tag, className, text) {
  const el = document.createElement(tag);

  if (className) {
    el.className = className;
  }

  if (text !== undefined) {
    el.textContent = text;
  }

  return el;
}

// Generate people directory
sections.forEach((group, i) => {

  const section = element('section', 'people-section');
  section.dataset.role = group.title;

  if (i === 0) {
    section.classList.add('pi-section');
  }

  const heading = element('h2', '', group.title);
  heading.id = `section-${i}`;

  section.setAttribute('aria-labelledby', heading.id);
  section.append(heading);

  group.people.forEach(person => {

    const article = element('article', 'person');

    if (i === 0) {
      article.classList.add('pi-person');
    }

    article.dataset.search = `
      ${person.name}
      ${group.title}
      ${person.position || ''}
      ${person.affiliation || ''}
      ${person.bio || ''}
    `.toLowerCase();

    // ---------------------------------
    // Photo (left column)
    // ---------------------------------
    if (person.photo) {

      const portrait = element('div', 'portrait');
      const img = element('img');

      img.src = `assets/${person.photo}`;
      img.alt = `Portrait of ${person.name}`;
      img.loading = i === 0 ? 'eager' : 'lazy';

      img.addEventListener('error', () => {
        img.hidden = true;
        portrait.append(
          element('p', 'bio-placeholder', 'Portrait unavailable')
        );
      }, { once: true });

      portrait.append(img);
      article.append(portrait);
    }

    // ---------------------------------
    // Profile information (right column)
    // ---------------------------------
    const body = element('div', 'person-body');

    // Name
    body.append(element('h3', '', person.name));

    // Position
    if (person.position) {
      body.append(
        element('p', 'person-position', person.position)
      );
    }

    // Affiliation
    if (person.affiliation) {
      body.append(
        element('p', 'person-affiliation', person.affiliation)
      );
    }

    // Email for other lab members
    if (i !== 0 && person.email) {

      const contact = element('p', 'contact');
      const a = element('a', '', person.email);

      a.href = `mailto:${person.email}`;

      contact.append('[ ', a, ' ]');
      body.append(contact);
    }

    // ---------------------------------
    // Biography
    // ---------------------------------
    if (person.bio !== '') {

      const bio = element(
        'p',
        person.bio ? 'person-bio' : 'bio-placeholder',
        person.bio || 'Add a biography here.'
      );

      // Biography stays inside the right column
      body.append(bio);
    }

    // ---------------------------------
    // PI links: AFTER biography
    // ---------------------------------
    if (i === 0) {

      const links = element('nav', 'person-links');

      links.setAttribute(
        'aria-label',
        `${person.name} links`
      );

      const addLink = (label, url) => {

        if (!url) return;

        // Add separator between links
        if (links.children.length > 0) {
          const separator = element(
            'span',
            'link-separator',
            '·'
          );

          separator.setAttribute(
            'aria-hidden',
            'true'
          );

          links.append(separator);
        }

        const a = element('a', '', label);
        a.href = url;

        links.append(a);
      };

      addLink(
        'Email',
        person.email ? `mailto:${person.email}` : null
      );

      addLink('Google Scholar', person.scholar);
      addLink('LinkedIn', person.linkedin);
      addLink('CV', person.cv);

      // Links appear BELOW the biography
      body.append(links);
    }

    // Add profile information
    article.append(body);

    // Add person to section
    section.append(article);

  });

  // Add section to directory
  directory.append(section);

});
