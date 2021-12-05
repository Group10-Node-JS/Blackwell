module.exports = {
    Admin: function (req, res, next) {
        if(global.tipoUsuario == "ADM") {
          return next();
        } else {
          res.render('erro', {title: 'Acesso Negado', style: 'form-validation'});
        }
    },

    User: function (req, res, next) {
        if(global.tipoUsuario == "USER") {
            return next();
        } else {
            res.render('erro', {title: 'Acesso Negado', style: 'form-validation'});
        }
    }
}