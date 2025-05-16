export const GET_ALL_INDICATOR_RESULT =
  "select ri.id ,i.id as 'fkidindicador', i.nombre as 'indicardor_nombre', ri.fechacalculo, ri.resultado from resultadoindicador ri inner join indicador i on i.id = ri.fkidindicador";

export const GET_ALL_VARIABLES_INDICATOR = `select vi.id, vi.dato, vi.fechadato, vi.fkidindicador, i.nombre as 'nombre indicador', vi.fkemailusuario, vi.fkidvariable, v.nombre as 'nombre variable'
    from variablesporindicador vi
    inner join indicador i on i.id = vi.fkidindicador
    inner join usuario u on u.email = vi.fkemailusuario
    inner join variable v on v.id = vi.fkidvariable`;

export const GET_ALL_VARIABLES_USER = `select v.id, v.nombre, v.fechacreacion, v.fkemailusuario from variable v
inner join usuario u on v.fkemailusuario = u.email`;

export const GET_ALL_ACTOR = `select a.id, a.nombre, a.fkidtipoactor, ta.nombre as 'tipo actor' from actor a 
inner join tipoactor ta on a.fkidtipoactor = ta.id
`;

export const GET_ALL_INDICATORS = `SELECT
    i.id,
    i.codigo,
    i.nombre,
    i.objetivo,
    i.alcance,
    i.formula,
    meta,
    i.fkidtipoindicador,
    ti.nombre AS 'nombre tipo indicador',
    i.fkidunidadmedicion,
    um.descripcion AS 'nombre unidad medicion',
    i.fkidsentido,
    s.nombre AS 'sentido nombre',
    i.fkidfrecuencia,
    i.fkidarticulo,
    a.nombre AS 'nombre articulo',
    i.fkidliteral,
    l.descripcion AS 'nombre literal',
    i.fkidnumeral,
    n.descripcion AS 'nombre numeral',
    i.fkidparagrafo,
    p.descripcion AS 'nombre paragrafo'
FROM
    dbo.indicador i
INNER JOIN
    dbo.tipoindicador ti ON i.fkidtipoindicador = ti.id
INNER JOIN
    dbo.unidadmedicion um ON i.fkidunidadmedicion = um.id
INNER JOIN
    dbo.sentido s ON i.fkidsentido = s.id
LEFT JOIN
    dbo.articulo a ON i.fkidarticulo = a.id
LEFT JOIN
    dbo.literal l ON i.fkidliteral = l.id
LEFT JOIN
    dbo.numeral n ON i.fkidnumeral = n.id
LEFT JOIN
    dbo.paragrafo p ON i.fkidparagrafo = p.id;`;
