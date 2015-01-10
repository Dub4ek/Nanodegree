var bio = {
    name: 'Andrei Starodubtcev',
    role: 'Something Developer',
    contacts: [
        { mobile: 9999999 },
        { email: 'vasa@persik.com' },
        { gitHub: 'KevinMitnik@github.com' },
        { twitter: 'KevinMitnik' },
        { location: 'Russia' }
    ],
    welcomeMessage: "Hello my dear friends",
    skills: [
        'innovate perfectionism development',
        'corporate literacy'
    ],
    biopic: '/images/fry.jpg'
};

var workExperienceData = {
    jobs: [{
        employer: "Secret Factory",
        title: "Spy",
        location: "Russia Siberia",
        dates: "January 1898 - February 1905",
        description: "Am terminated it excellence invitation projection as. She graceful shy believed distance use nay. Lively is people so basket ladies window expect. Supply as so period it enough income he genius. Themselves acceptance bed sympathize get dissimilar way admiration son. Design for are edward regret met lovers. This are calm case roof and."
    }, {employer: "Another Secret Factory",
        title: "AntiSpy",
        location: "USA Alaska",
        dates: "February 1905 - March 1907",
        description: "It if sometimes furnished unwilling as additions so. Blessing resolved peculiar fat graceful ham. Sussex on at really ladies in as elinor. Sir sex opinions age properly extended. Advice branch vanity or do thirty living. Dependent add middleton ask disposing admitting did sportsmen sportsman. "}]
};

function replacer(str, value, anchor) {
    'use strict';
    anchor = anchor === 'undefined' ? anchor : '%data%';

    return str.replace(anchor, value);
}

(function () {
    'use strict';
    var myName = bio.name,
        myRole = bio.role;

    $('#header').prepend(replacer(HTMLheaderRole, myRole));
    $('#header').prepend(replacer(HTMLheaderName, myName));

    var contactCollection = bio.contacts;
    var mobile = contactCollection[0].mobile;
    var eMail = contactCollection[1].email;
    var gitHub = contactCollection[2].gitHub;
    var location = contactCollection[4].location;
    var twitter = contactCollection[3].twitter;

    var contacts = replacer(HTMLmobile, mobile) + replacer(HTMLemail, eMail) + replacer(HTMLtwitter, twitter) + replacer(HTMLgithub, gitHub) + replacer(HTMLlocation, location);
    $('#topContacts').append(replacer(replacer(HTMLcontactGeneric, contacts, '%contact%'), ''));


    $('#header').append(replacer(HTMLbioPic, bio.biopic));
    $('#header').append(replacer(HTMLWelcomeMsg, bio.welcomeMessage));

    $('#header').append(HTMLskillsStart);

    var skillsCollection = bio.skills.map(function (item) {
        return replacer(HTMLskills, item);
    }).join(' ');

    $('#skills').prepend(skillsCollection);


    function addWorkExperience(data) {
        $('#workExperience').append(HTMLworkStart);
        $('.work-entry').append(replacer(HTMLworkEmployer, data.employer) + replacer(HTMLworkTitle, data.title));
        $('.work-entry').append(replacer(HTMLworkDates, data.dates));
        $('.work-entry').append(replacer(HTMLworkLocation, data.location));
        $('.work-entry').append(replacer(HTMLworkDescription, data.description));
    }


    addWorkExperience(workExperienceData.jobs[0]);
    addWorkExperience(workExperienceData.jobs[1]);
})();



