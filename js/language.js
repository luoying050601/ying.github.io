function loadLanguage(lang) {
    fetch(`../json/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // 为导航栏设置文本内容
            document.getElementById('home-link').innerText = data.header.home;
            document.getElementById('news-link').innerText = data.header.news;
            document.getElementById('publications-link').innerText = data.header.publications;
            document.getElementById('awards-link').innerText = data.header.awards;
            document.getElementById('career-link').innerText = data.header.career;
            document.getElementById('links-link').innerText = data.header.links;
            document.getElementById('contact-link').innerText = data.header.contact;
            // About Me Section
            document.getElementById('about-title').innerText = data.about.title;
            document.getElementById('about-content1').innerHTML = data.about.content1;
            document.getElementById('about-content2').innerHTML = data.about.content2;
            // Education Section
            document.getElementById('education-title').innerText = data.about.education.title;
            const educationList = document.getElementById('education-list');
            educationList.innerHTML = '';  // Clear previous content
            data.about.education.degrees.forEach(degree => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${degree.year}</strong> ${degree.degree}<br>${degree.thesis ? degree.thesis : ''}`;
                educationList.appendChild(li);
            });


            document.getElementById('news-title').innerText = data.news.title;
            document.getElementById('news-content').innerHTML = data.news.content;

            // Publications Section
            document.getElementById('publications-title').innerText = data.publications.title;

            document.getElementById('journal-title').innerText = data.publications.journal;
            populateList('journal-list', data.publications.list.journal);

            document.getElementById('international-conference-title').innerText = data.publications.international;
            populateList('international-conference-list', data.publications.list.international);

            document.getElementById('domestic-conference-title').innerText = data.publications.domestic;
            populateList('domestic-conference-list', data.publications.list.domestic);

            document.getElementById('invited-talk-title').innerText = data.publications.invited;
            populateList('invited-talk-list', data.publications.list.invited);

            // Awards Section
            document.getElementById('awards-title').innerText = data.award.title;
            populateAwards('awards-content', data.award.awards);

            // Career Section
            document.getElementById('career-title').innerText = data.career.title;
            populateList('career-list', data.career.list);

            // Links Section
            document.getElementById('links-title').innerText = data.links.title;
            document.getElementById('institutions-title').innerText = data.links.institutions.title;
            populateList('institutions-list', data.links.institutions.list);

            document.getElementById('others-title').innerText = data.links.others.title;
            populateList('others-list', data.links.others.list);

            // Contact Section
            document.getElementById('contact-title').innerText = data.contact.title;
            document.getElementById('email-info').innerHTML = `<i class="fas fa-envelope"></i> <strong>Email:</strong> <br> ${data.contact.email}`;
            document.getElementById('address-info').innerHTML = `<i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> <br> ${data.contact.address}`;

            // 解析版权信息并插入到页面中
            document.getElementById('footer-copyright').innerText = data.footer.copyright;
        })
        .catch(error => console.error('Error loading language file:', error));

}

// Helper function to populate lists
function populateList(elementId, items) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = ''; // Clear the list first
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = item; // This assumes `item` contains HTML
        listElement.appendChild(listItem);
    });
}

// Helper function to populate awards
function populateAwards(elementId, awards) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // 清空容器

    // 创建最外层的 div，class 为 award-list
    const awardListDiv = document.createElement('div');
    awardListDiv.classList.add('award-list');

    awards.forEach(award => {
        const awardDiv = document.createElement('div');
        awardDiv.classList.add('award-item');

        awardDiv.innerHTML = `
      <div class="award-logo">
        <img alt="${award.alt}" src="${award.logo}"/>
      </div>
      <div class="award-content">
        <h3>${award.title}</h3>
        <p>${award.description}</p>
        ${award.link ? `<a href="${award.link}" target="_blank">More Info</a>` : ''}
      </div>`;

        awardListDiv.appendChild(awardDiv); // 将每个奖项添加到 award-list
    });

    container.appendChild(awardListDiv); // 将 award-list 添加到容器中
}