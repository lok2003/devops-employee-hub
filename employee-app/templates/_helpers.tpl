{{- define "employee.name" }}
{{- .Chart.Name }}
{{- end }}

{{- define "employee.namespace" }}
{{- .Values.namespace.name }}
{{- end }}


