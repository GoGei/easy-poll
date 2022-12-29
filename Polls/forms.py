from django import forms


class NewYearPollForm(forms.Form):
    field_1 = forms.CharField(max_length=128)
    field_2 = forms.BooleanField(required=False)
    field_3 = forms.IntegerField()
    field_4 = forms.CharField(widget=forms.Textarea)
