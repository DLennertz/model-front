import React, { useState, useEffect } from "react";
import "./InputModelCreate.css";
import EyeColorService from "../../../services/EyeColorService";
import HairColorService from "../../../services/HairColorService";
import CountryService from "../../../services/CountryService";
import ModeloService from "../../../services/ModelService";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const InputModelCreate = () => {
  const [eyeColor, setEyeColor] = useState([]);
  const [hairColor, setHairColor] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    EyeColorService.getEyeColor().then(setEyeColor);
    HairColorService.getHairColor().then(setHairColor);
    CountryService.getCountry().then(setCountry);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    // crie o FormData no submit (evita acumular dados entre submits)
    const formDataModelo = new FormData();

    const payload = {
      nomeCompleto: values.nome,
      dataNascimento: values.niver,
      idCountry: values.idCountry,
      height: values.height,
      idEyeColor: values.idEyeColor,
      idHairColor: values.idHairColor,
      bust: values.bust,
      waist: values.waist,
      hips: values.hips,
      rating: values.rating,
      boys: values.boys,
      girls: values.girls,
      photos: values.foto ? [{ url: values.foto }] : [],
    };

    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    formDataModelo.append("newModel", blob);

    try {
      await ModeloService.createModeloSemFoto(formDataModelo);
      await Swal.fire("", "Cadastro feito com sucesso", "success");
      resetForm();
    } catch (error) {
      console.error("Não foi salvo", error);
      Swal.fire("Erro", "Não foi possível salvar o cadastro.", "error");
    }
  };

  const validations = yup.object().shape({
    nome: yup.string().required("Informe o nome"),
    niver: yup.string().required("Informe a data de nascimento"),
    idCountry: yup.string().required("Escolha um país"),
    height: yup.string().required("Informe a altura"),
  });

  return (
    <Formik
      initialValues={{
        nome: "",
        niver: "",
        idCountry: "",
        height: "",
        idEyeColor: "",
        idHairColor: "",
        bust: "",
        waist: "",
        hips: "",
        rating: "",
        boys: "",
        girls: "",
        foto: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validations}
    >
      <Form className="Form">
        <p>Informações</p>

        <div className="Form_div" id="infoPessoal">
          <div className="Form_Group">
            <Field
              name="nome"
              className="Form_Field"
              placeholder="Nome Completo"
              id="idField"
            />
            <ErrorMessage component="span" name="nome" className="Form_Error" />
          </div>

          <div className="Form_Group">
            <Field
              as="select"
              name="idCountry"
              className="Form_Field"
              id="country_selector"
            >
              <option value="">--Escolha um país--</option>
              {country.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              component="span"
              name="idCountry"
              className="Form_Error"
            />
          </div>

          <div className="Form_Group">
            <Field
              type="date"
              name="niver"
              className="Form_Field"
              id="birthField"
            />
            <ErrorMessage
              component="span"
              name="niver"
              className="Form_Error"
            />
          </div>
        </div>

        <div className="Form_div" id="medidas">
          <div className="Form_Group">
            <Field
              name="height"
              className="Form_Field"
              placeholder="Altura"
              id="heightField"
            />
            <ErrorMessage
              component="span"
              name="height"
              className="Form_Error"
            />
          </div>
          <div className="Form_Group">
            <Field
              name="bust"
              className="Form_Field"
              placeholder="Bust"
              id="bustField"
            />
            <ErrorMessage component="span" name="bust" className="Form_Error" />
          </div>
          <div className="Form_Group">
            <Field
              name="waist"
              className="Form_Field"
              placeholder="Waist"
              id="waistField"
            />
            <ErrorMessage
              component="span"
              name="waist"
              className="Form_Error"
            />
          </div>
          <div className="Form_Group">
            <Field
              name="hips"
              className="Form_Field"
              placeholder="Hips"
              id="hipsField"
            />
            <ErrorMessage component="span" name="hips" className="Form_Error" />
          </div>
        </div>

        <div className="Form_div" id="aparencia">
          <div className="Form_Group">
            <Field
              as="select"
              name="idEyeColor"
              className="Form_Field"
              id="eye_selector"
            >
              <option value="">--Escolha uma cor de olhos--</option>
              {eyeColor.map((item) => (
                <option key={item.idEyeColor} value={item.idEyeColor}>
                  {item.eyeColor}
                </option>
              ))}
            </Field>
            <ErrorMessage
              component="span"
              name="idEyeColor"
              className="Form_Error"
            />
          </div>

          <div className="Form_Group">
            <Field
              as="select"
              name="idHairColor"
              className="Form_Field"
              id="hair_selector"
            >
              <option value="">--Escolha uma cor de cabelo--</option>
              {hairColor.map((item) => (
                <option key={item.idHairColor} value={item.idHairColor}>
                  {item.hairColor}
                </option>
              ))}
            </Field>
            <ErrorMessage
              component="span"
              name="idHairColor"
              className="Form_Error"
            />
          </div>

          <div className="Form_Group">
            <Field
              as="select"
              name="rating"
              className="Form_Field"
              id="rating_selector"
            >
              <option value="">--Rating--</option>
              {[
                "10.0",
                "9.5",
                "9.0",
                "8.5",
                "8.0",
                "7.5",
                "7.0",
                "6.5",
                "6.0",
              ].map((v) => (
                <option key={v} value={v}>
                  {v.replace(".0", "")}
                </option>
              ))}
            </Field>
            <ErrorMessage
              component="span"
              name="rating"
              className="Form_Error"
            />
          </div>
        </div>

        <div className="Form_div" id="filhos">
          <div className="Form_Group">
            <Field
              name="boys"
              className="Form_Field"
              placeholder="Boys"
              id="boyField"
            />
            <ErrorMessage component="span" name="boys" className="Form_Error" />
          </div>
          <div className="Form_Group">
            <Field
              name="girls"
              className="Form_Field"
              placeholder="Girls"
              id="girlField"
            />
            <ErrorMessage
              component="span"
              name="girls"
              className="Form_Error"
            />
          </div>
          <div className="Form_Group">
            <Field
              name="foto"
              className="Form_Field"
              placeholder="Foto (URL)"
              id="pathField"
            />
            <ErrorMessage component="span" name="foto" className="Form_Error" />
          </div>
        </div>

        <div className="Form_div" id="campoButao">
          <button className="Form_Btn" type="submit" id="submitButton">
            Cadastrar
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default InputModelCreate;
