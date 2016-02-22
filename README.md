## Roll Setup

This repository contains some code to seed a roll application user
used to lock down requests to [Roll](https://github.com/xtraclabs/roll),
and to create a user against roll after obtaining an access token
as the roll application user.

The functions performed are essentially those shown in the README.md file
associated with roll.

### Roll Application Seeding

Roll is meant to be used in the context of a developer portal application, and for
providing a mechanism for authentication and trust. To be used securely in the
context of a developer portal, we will used Roll to secure itself. To do this,
we boot roll in non-secure mode, and use `seed.js` to seed a 'developer' account
associated with the portal, and an application that represents the portal. We
then reboot Roll in secure mode, using the client_id associated with the
Roll application obtained via the seeding process.
