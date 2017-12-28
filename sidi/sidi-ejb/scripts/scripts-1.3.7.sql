update
(
   select dp.datainiciotransmissao di,e.aberturasinal abs,dp.dataterminotransmissao dt,e.fechamentosinal fs
   from   distribuicaoprincipal dp
    join evento e on e.id = dp.evento_id where e.DTYPE='MOSAICO'
)
set di=abs
   ,dt=fs
;

commit