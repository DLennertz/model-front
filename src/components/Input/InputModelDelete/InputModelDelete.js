// src/components/Input/InputModelDelete/InputModelDelete.jsx
import React from "react";
import ModeloService from "../../../services/ModelService";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./InputModelDelete.css";

const InputModelDelete = () => {
  const schema = yup.object({
    valor: yup
      .number()
      .typeError("Informe um número")
      .integer()
      .min(1)
      .required("Obrigatório"),
  });

  const handleSubmit = async ({ valor }, { setSubmitting, resetForm }) => {
    try {
      // Se seu service for objeto:
      await ModeloService.deleteModeloId(valor);
      alert(`Apagou id: ${valor}`);
      resetForm();
    } catch (e) {
      console.error(e);
      alert("Não foi possível deletar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <p>Digite o id do Modelo desejado, abaixo!</p>

      <Formik
        initialValues={{ valor: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="Form">
            <div className="caixa">
              <div className="Form_Group" id="campoId">
                <Field name="valor" className="Form_Field" placeholder="ID" />
                <ErrorMessage
                  component="span"
                  name="valor"
                  className="Form_Error"
                />
              </div>

              <button
                className="Form_Btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InputModelDelete;
