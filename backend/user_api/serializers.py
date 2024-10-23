from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(
			email=clean_data['email'],
			password=clean_data['password'],
			phone_num=clean_data['phone_num'],
			first_name=clean_data['first_name'],
			last_name=clean_data['last_name'] )
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserEditSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	
	def update(self, instance, validated_data):
		validated_data.pop('email', None)  # Remove email if present in validated_data
		for attr, value in validated_data.items():
			if attr == 'password':
				instance.set_password(value)
			else:
				setattr(instance, attr, value)
		instance.save()
		return instance

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = (
			'user_id', 'email', 'username', 'phone_num', 'first_name', 'last_name',
			'card_number', 'card_exp_date', 'card_cvv', 'card_number2', 'card_exp_date2',
			'card_cvv2', 'card_number3', 'card_exp_date3', 'card_cvv3', 'home_street',
			'home_city', 'home_state', 'zipcode', 'promotions'
		)
