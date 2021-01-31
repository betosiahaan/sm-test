--- Table

-- DROP SEQUENCE public.org_structure_seq;

CREATE SEQUENCE "org_structure_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE public.Org_structure_seq
  OWNER TO postgres;

CREATE TABLE public.org_structure
(
  AreaID integer NOT NULL DEFAULT nextval('org_structure_seq'::regclass),
  objectName character varying(50) NOT NULL,
  ParentAreaID integer NOT NULL,
  CONSTRAINT data_pkey PRIMARY KEY (AreaID),
  CONSTRAINT data_name_parent_id_unique UNIQUE (objectName, ParentAreaID)
)
WITH (
  OIDS=FALSE
);

INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (63,'Complex Delta',78);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (466,'RW1',101);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (10,'Cluster 96',466);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (31,'Cluster 6',466);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (111,'Mampang',0);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (78,'RW3',111);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (54,'Cluster 100',406);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (406,'PERUM II',101);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (101,'Grogol',0);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (62,'Cluster 12',406);
INSERT INTO public.org_structure(AreaID, objectName, ParentAreaID) VALUES (43,'Cluster 57',466);

--- Function 

CREATE OR REPLACE FUNCTION public.get_all_children_of_parent(use_parent integer) RETURNS integer[] AS
        $BODY$
        DECLARE
            process_parents INT4[] := ARRAY[ use_parent ];
            children INT4[] := '{}';
            new_children INT4[];
        BEGIN
            WHILE ( array_upper( process_parents, 1 ) IS NOT NULL ) LOOP
                new_children := ARRAY( SELECT AreaID FROM org_structure WHERE ParentAreaID = ANY( process_parents ) AND AreaID <> ALL( children ) );
                children := children || new_children;
                process_parents :=  new_children;
            END LOOP;
            RETURN children;
        END;
        $BODY$
LANGUAGE plpgsql VOLATILE COST 100;
ALTER FUNCTION public.get_all_children_of_parent(integer) OWNER TO postgres;



WITH RECURSIVE c AS (
   SELECT 111 AS AreaID
   UNION ALL
   SELECT sa.AreaID
   FROM org_structure AS sa
      JOIN c ON c.AreaID = sa. ParentAreaID 
)   
SELECT DISTINCT objectname from org_structure WHERE areaid IN (
	SELECT AreaID FROM c 
	UNION ALL 
	SELECT ParentAreaID FROM org_structure AS AreaID WHERE AreaID = 111);




SELECT objectName FROM org_structure WHERE AreaID = any(get_all_children_of_parent(111))
SELECT objectName FROM org_structure WHERE AreaID = any(get_all_children_of_parent(63))