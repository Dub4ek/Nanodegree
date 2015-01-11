var bio = {
    'name': 'Andrei Starodubtcev',
    'role': 'Something Developer',
    'contacts': {
        'mobile': 9999999,
         'email': 'vasya@persik.com',
         'gitHub': 'KevinMitnik@github.com',
         'twitter': 'KevinMitnik',
         'location': 'Moscow, Russia'
    },
    'welcomeMessage': "Hello my dear friends",
    'skills': [
        'innovate perfectionism development',
        'corporate literacy',
        'socialization'
    ],
    'biopic': 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/086/2c3/1e4acc6.jpg'
};

var work = {
    "jobs": [
        {
            'employer': "Secret Factory",
            'title': "Spy",
            'location': "Siberia, Russia",
            'dates': "January 1898 - February 1905",
            'description': "Am terminated it excellence invitation projection as. She graceful shy believed distance use nay. Lively is people so basket ladies window expect. Supply as so period it enough income he genius. Themselves acceptance bed sympathize get dissimilar way admiration son. Design for are edward regret met lovers. This are calm case roof and."
        },
        {'employer': "Another Secret Factory",
            'title': "AntiSpy",
            'location': "Siberia, Russia",
            'dates': "February 1905 - March 1907",
            'description': "It if sometimes furnished unwilling as additions so. Blessing resolved peculiar fat graceful ham. Sussex on at really ladies in as elinor. Sir sex opinions age properly extended. Advice branch vanity or do thirty living. Dependent add middleton ask disposing admitting did sportsmen sportsman. "}
    ]
};

var projects = {
    'projects': [
        {
            'title': "High securuty project",
            'dates': "January 1899 - February 1905",
            'description': "Answer misery adieus add wooded how nay men before though. Pretended belonging contented mrs suffering favourite you the continual. Mrs civil nay least means tried drift. Natural end law whether but and towards certain. Furnished unfeeling his sometimes see day promotion. Quitting informed concerns can men now. Projection to or up conviction uncommonly delightful continuing. In appetite ecstatic opinions hastened by handsome admitted.",
            'images': []
        },
        { 'title': "Another securuty project",
            'dates': "February 1905 - March 1907",
            'description': "Answer misery adieus add wooded how nay men before though. Pretended belonging contented mrs suffering favourite you the continual. Mrs civil nay least means tried drift. Natural end law whether but and towards certain. Furnished unfeeling his sometimes see day promotion. Quitting informed concerns can men now. Projection to or up conviction uncommonly delightful continuing. In appetite ecstatic opinions hastened by handsome admitted.",
            'images': []}
    ]
};


var education = {
    'schools': [
        {
            'name': "Main Russian Secret School",
            'location': "Siberia, Russia",
            'degree': "Junior-Spy",
            'majors': ["Agency", "CS"],
            'dates': "March 1870 - April 1875",
            'url': "https://google.com"
        },
        {
            'name': "University of Siberia",
            'location': "Siberia, Russia",
            'degree': "Spy",
            'majors': ["Agency", "CS"],
            'dates': "September 1875 - April 1880",
            'url': "https://google.com"
        }
    ],
    'onlineCourses': [
        {
            'title': "Siberia Online University",
            'school': "Main Siberia University",
            'date': "1875",
            'url': "http://yandex.ru"
        }
    ]
};


function replacer(str, value, anchor) {
    anchor = anchor === 'undefined' ? anchor : '%data%';

    return str.replace(anchor, value);
}

bio.display = function () {
    var myName = bio.name,
        myRole = bio.role;

    $('#header').prepend(replacer(HTMLheaderRole, myRole));
    $('#header').prepend(replacer(HTMLheaderName, myName));

    var contactCollection = bio.contacts;
    var mobile = contactCollection.mobile;
    var eMail = contactCollection.email;
    var gitHub = contactCollection.gitHub;
    var location = contactCollection.location;
    var twitter = contactCollection.twitter;

    var contacts = replacer(HTMLmobile, mobile) + replacer(HTMLemail, eMail) + replacer(HTMLtwitter, twitter) + replacer(HTMLgithub, gitHub) + replacer(HTMLlocation, location);
    $(contacts).appendTo('#topContacts, #footerContacts');


    $('#header').append(replacer(HTMLbioPic, bio.biopic) + replacer(HTMLWelcomeMsg, bio.welcomeMessage));
    $('#header').append(HTMLskillsStart);

    bio.skills.forEach(function (item) {
        $("#skills").append(replacer(HTMLskills, item));
    })
}

work.display = function () {
    //Add work experience
    function addWorkExperience(data) {
        $('.work-entry').append(replacer(HTMLworkEmployer, data.employer) + replacer(HTMLworkTitle, data.title));
        $('.work-entry').append(replacer(HTMLworkDates, data.dates));
        $('.work-entry').append(replacer(HTMLworkLocation, data.location));
        $('.work-entry').append(replacer(HTMLworkDescription, data.description));
    }

    $('#workExperience').append(HTMLworkStart);

    for (var item in work.jobs) {
        addWorkExperience(work.jobs[item]);
    }
}

projects.display = function() {
    //Add projects description
    function addProjectsDescription(data) {
        $('.project-entry').append(replacer(HTMLprojectTitle, data.title));
        $('.project-entry').append(replacer(HTMLprojectDates, data.dates));
        $('.project-entry').append(replacer(HTMLprojectDescription, data.description));

        data.images.forEach(function (item) {
            if (item !== 'undefined')
                $('.project-entry').append(replacer(HTMLprojectImage, item));
        });
    }

    $('#projects').append(HTMLprojectStart);

    for (item in projects.projects) {
        addProjectsDescription(projects.projects[item]);
    }
}


education.display = function () {
    $('#education').append(HTMLschoolStart);

    function addEducation(data) {
        $('.education-entry:last').append(replacer(HTMLschoolName, data.name) + replacer(HTMLschoolDegree, data.degree) + replacer(HTMLschoolDates, data.dates) + replacer(HTMLschoolLocation, data.location) + replacer(HTMLschoolMajor, data.majors.toString()));
    }

    for (item in education.schools) {
        addEducation(education.schools[item]);
    }

    //Online classes
    $('#education').append(HTMLonlineClasses);

    function addOnlineClassesData(data) {
        $("#education").append(HTMLschoolStart);
        $('.education-entry:last').append(replacer(HTMLonlineTitle, data.title) + replacer(HTMLonlineSchool, data.school) + replacer(HTMLonlineDates, data.date) + replacer(HTMLonlineURL, data.url));
    }

    for (item in education.onlineCourses) {
        addOnlineClassesData(education.onlineCourses[item]);
    }
}


bio.display();
work.display();
projects.display();
education.display();


$(document).click(function (loc) {
    logClicks(loc.pageX, loc.pageY);
});

$("#main").append(internationalizeButton);

// Add map!
$("#mapDiv").append(googleMap);






