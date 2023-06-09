const AccessControl = require('accesscontrol');

const ac = new AccessControl();

const roles = () => {
    ac.grant('d_viewer').readOwn('document')
    ac.grant('d_editor').extend('d_viewer').updateOwn('document')
    ac.grant('d_admin').extend('d_editor').deleteOwn('document')

    ac.grant('viewer').extend('d_viewer').readOwn('workspace')
    ac.grant('editor').extend('viewer').extend('d_editor').updateOwn('workspace')
    ac.grant('admin').extend('editor').extend('d_admin').deleteOwn('workspace')

    return ac;
};

module.exports = roles;